import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";

// RFC 8288 Link response headers for agent discovery (isitagentready.com
// checks these on GET /). The live site is hosted on GitHub Pages, which
// cannot set custom response headers — the same headers are injected at the
// edge by a Cloudflare transform rule, see script/cloudflare-agent-readiness.mjs.
// This constant covers any deployment served by this Express server and must
// stay in sync with the Cloudflare rule and the <link> tags in client/src/seo.ts.
export const AGENT_LINK_HEADER = [
  '</llms.txt>; rel="describedby"',
  '<https://docs.enclava.dev/>; rel="service-doc"',
].join(", ");

// Markdown for Agents (RFC 9727 / llmstxt.org conventions): when a request
// prefers text/markdown and a prerendered .md twin exists in dist/public,
// serve it instead of the HTML page. Mirrors the edge behaviour of the
// Cloudflare worker deployed by script/cloudflare-agent-readiness.mjs (GitHub
// Pages itself cannot do Accept negotiation).
const wantsMarkdown = (req: Request) =>
  (req.method === "GET" || req.method === "HEAD") &&
  /text\/markdown\s*(;[^,]*)?(,|$)/i.test(req.headers.accept ?? "");

// "/" -> index.md, "/platform" -> platform.md, "/blog" -> blog/index.md.
// Only extensionless document paths qualify; assets and real files never do.
const mdTwin = (pathname: string): string | null => {
  if (/\/[^./]+\/$/.test(pathname)) return `${pathname}index.md`; // "/blog/"
  if (pathname === "/") return "index.md";
  if (/\/[^./]+$/.test(pathname)) return `${pathname.slice(1)}.md`;
  return null;
};

// Rough token estimate (chars/4); informational header agents can use to
// budget context. Cloudflare's Markdown for Agents sets the same header.
const tokenEstimate = (body: string) => Math.ceil(body.length / 4);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Markdown content negotiation before the static/SPA handlers.
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Vary", "Accept");
    if (!wantsMarkdown(req)) return next();
    const twin = mdTwin(req.path);
    if (twin) {
      // "/blog" prefers blog.md but falls back to blog/index.md (GitHub
      // Pages redirects /blog -> /blog/, so both shapes exist).
      const file =
        [path.join(distPath, twin), path.join(distPath, twin.replace(/\.md$/, "/index.md"))]
          .find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
      if (file) {
        res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        res.setHeader("x-markdown-tokens", String(tokenEstimate(fs.readFileSync(file, "utf8"))));
        return res.sendFile(file);
      }
    }
    next();
  });

  app.use(
    express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Link", AGENT_LINK_HEADER);
          res.setHeader("Vary", "Accept");
        }
      },
    }),
  );

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.setHeader("Link", AGENT_LINK_HEADER);
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
