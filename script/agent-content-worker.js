/**
 * Markdown for Agents — Cloudflare Worker for enclava.dev
 * ======================================================
 *
 * GitHub Pages hosts the site and cannot do Accept-header negotiation, and
 * Cloudflare's built-in Markdown for Agents zone setting is Pro+ only. This
 * worker adds `Accept: text/markdown` content negotiation at the edge on the
 * free plan: every page has a prerendered .md twin (client/public/*.md), and
 * GitHub Pages already serves .md files as text/markdown, so negotiation is
 * just an internal rewrite to the twin plus negotiation-relevant headers.
 *
 * Deployed by script/cloudflare-agent-readiness.mjs on route `enclava.dev/*`.
 * Mirrored in Express by server/static.ts — keep the three in sync:
 *   - mdTwin() mapping below
 *   - mdTwin() + wantsMarkdown() in server/static.ts
 *   - the .md twins in client/public/
 *
 * Behaviour:
 * - GET/HEAD a document path with Accept: text/markdown -> the .md twin with
 *   Content-Type: text/markdown; charset=utf-8, Vary: Accept and an
 *   x-markdown-tokens estimate (same header Cloudflare's own converter sets).
 * - If no twin exists at origin (404), fall through to the HTML page.
 * - HTML responses get Vary: Accept; browsers and assets pass through
 *   untouched. Same-zone subrequests go straight to the origin, so there is
 *   no re-entry loop.
 */

const HOST = "enclava.dev";
const MARKDOWN_ACCEPT_RE = /text\/markdown\s*(;[^,]*)?(,|$)/i;

// "/" -> "/index.md", "/platform" -> "/platform.md", "/blog" -> "/blog.md"
// (with /blog/index.md fallback), "/blog/" -> "/blog/index.md".
// Only extensionless document paths qualify; assets never do.
function mdTwin(pathname) {
  if (/\/[^./]+\/$/.test(pathname)) return `${pathname}index.md`;
  if (pathname === "/") return "/index.md";
  if (/\/[^./]+$/.test(pathname)) return `${pathname}.md`;
  return null;
}

function markdownHeaders(originHeaders, body) {
  const headers = new Headers(originHeaders);
  headers.set("content-type", "text/markdown; charset=utf-8");
  headers.append("vary", "Accept");
  if (body !== null) {
    headers.set("x-markdown-tokens", String(Math.ceil(body.length / 4)));
  } else {
    const len = Number(originHeaders.get("content-length") ?? 0);
    if (len > 0) headers.set("x-markdown-tokens", String(Math.ceil(len / 4)));
  }
  return headers;
}

async function negotiateMarkdown(request, url) {
  const twin = mdTwin(url.pathname);
  if (twin === null) return null;

  // Fetch the twin from the origin without the markdown Accept header.
  const twinUrl = new URL(twin, url.origin);
  const sub = new Request(twinUrl, {
    method: request.method,
    headers: new Headers(request.headers),
  });
  sub.headers.delete("accept");
  const origin = await fetch(sub);

  if (!origin.ok) return null; // no twin for this page -> HTML fallback

  if (request.method === "HEAD") {
    return new Response(null, { status: origin.status, headers: markdownHeaders(origin.headers, null) });
  }
  const body = await origin.text();
  return new Response(body, { status: origin.status, headers: markdownHeaders(origin.headers, body) });
}

export default {
  async fetch(request) {
    const accept = request.headers.get("accept") ?? "";
    if ((request.method === "GET" || request.method === "HEAD") && MARKDOWN_ACCEPT_RE.test(accept)) {
      const url = new URL(request.url);
      if (url.hostname === HOST) {
        const md = await negotiateMarkdown(request, url);
        if (md) return md;
      }
    }

    const res = await fetch(request);

    // Tell caches the HTML representation depends on the Accept header.
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.startsWith("text/html")) {
      const wrapped = new Response(res.body, res);
      wrapped.headers.append("vary", "Accept");
      return wrapped;
    }
    return res;
  },
};
