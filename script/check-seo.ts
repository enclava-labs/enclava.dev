// Verifies the static build is crawlable: every route has its own pre-rendered
// HTML with unique head tags, plus robots.txt and sitemap.xml.
// Run after `pnpm build:client`.
import { readFileSync, existsSync } from "fs";
import path from "path";

const out = path.resolve(import.meta.dirname, "..", "dist", "public");
const SITE = "https://enclava.dev";

const routes: Record<string, string> = {
  "/": "index.html",
  "/platform": "platform.html",
  "/use-cases": "use-cases.html",
  "/services": "services.html",
  "/get-started": "get-started.html",
  "/blog": "blog.html",
  "/blog/introduction-to-confidential-computing": "blog/introduction-to-confidential-computing.html",
  "/privacy": "privacy.html",
  "/terms": "terms.html",
};

const errors: string[] = [];
const titles = new Map<string, string>();
const fail = (msg: string) => errors.push(msg);

for (const [route, file] of Object.entries(routes)) {
  const p = path.join(out, file);
  if (!existsSync(p)) {
    fail(`${route}: missing ${file}`);
    continue;
  }
  const html = readFileSync(p, "utf-8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) fail(`${route}: no <title>`);
  else if (titles.has(title)) fail(`${route}: title duplicates ${titles.get(title)}`);
  else titles.set(title, route);

  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail(`${route}: no meta description`);
  const url = SITE + (route === "/" ? "/" : route);
  if (!html.includes(`<link rel="canonical" href="${url}"`)) fail(`${route}: canonical != ${url}`);
  if (!html.includes(`<meta property="og:url" content="${url}"`)) fail(`${route}: og:url != ${url}`);
  if (!/<h1[^>]*>/.test(html)) fail(`${route}: no pre-rendered <h1>`);
  if (!html.includes('type="application/ld+json"')) fail(`${route}: no JSON-LD`);
  if (html.includes("maximum-scale")) fail(`${route}: viewport blocks zoom`);
  if (!html.includes('rel="icon"')) fail(`${route}: no favicon`);

  // RFC 8288 agent discovery links (HTML equivalent of the Link response headers
  // injected by the Cloudflare transform rule, see script/cloudflare-agent-readiness.mjs)
  if (route === "/") {
    if (!html.includes('<link rel="describedby" href="/llms.txt"'))
      fail(`/: missing describedby agent-discovery link to /llms.txt`);
    if (!html.includes('<link rel="service-doc" href="https://docs.enclava.dev/"'))
      fail(`/: missing service-doc agent-discovery link to docs.enclava.dev`);
  }

  // Markdown for Agents: every page must have a prerendered .md twin so
  // Accept: text/markdown negotiation (Express middleware + Cloudflare
  // worker) never falls through to HTML.
  const twin =
    route === "/" ? "index.md" : route === "/blog" ? "blog/index.md" : `${route.slice(1)}.md`;
  const twinPath = path.join(out, twin);
  if (!existsSync(twinPath)) fail(`${route}: missing markdown twin ${twin}`);
  else {
    const md = readFileSync(twinPath, "utf8");
    if (md.trim().length < 200) fail(`${route}: markdown twin ${twin} looks empty`);
    if (!/^# /m.test(md) && !/^title:/m.test(md))
      fail(`${route}: markdown twin ${twin} has no h1 or frontmatter title`);
  }
}

const robots = path.join(out, "robots.txt");
if (!existsSync(robots)) fail("missing robots.txt");
else if (!readFileSync(robots, "utf-8").includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt lacks Sitemap");

const sitemap = path.join(out, "sitemap.xml");
if (!existsSync(sitemap)) fail("missing sitemap.xml");
else {
  const xml = readFileSync(sitemap, "utf-8");
  for (const route of Object.keys(routes)) {
    if (!xml.includes(`<loc>${SITE}${route === "/" ? "/" : route}</loc>`)) fail(`sitemap.xml missing ${route}`);
  }
}

const notFound = path.join(out, "404.html");
if (!existsSync(notFound) || !readFileSync(notFound, "utf-8").includes('content="noindex"')) {
  fail("404.html missing or indexable");
}

if (errors.length) {
  console.error(`SEO check failed (${errors.length}):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`SEO check passed for ${Object.keys(routes).length} routes`);
