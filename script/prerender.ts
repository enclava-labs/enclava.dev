// Pre-renders every route to static HTML after `vite build`, so GitHub Pages
// serves real 200 pages with per-route head tags instead of the SPA 404 fallback.
import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "dist", "public");
const serverOut = path.join(root, "dist", "prerender");

await build({
  configFile: path.join(root, "vite.config.ts"),
  logLevel: "warn",
  ssr: { noExternal: true },
  build: {
    ssr: path.join(root, "client", "src", "entry-server.tsx"),
    outDir: serverOut,
    emptyOutDir: true,
  },
});

const { render, getMeta, allRoutes, renderHead, SITE_URL } = await import(
  pathToFileURL(path.join(serverOut, "entry-server.js")).href
);

const template = readFileSync(path.join(out, "index.html"), "utf-8");
const page = (head: string, body: string) =>
  template
    .replace(/<!-- replaced per route[^>]*-->\s*<title>[^<]*<\/title>/, head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

const write = (file: string, html: string) => {
  const p = path.join(out, file);
  mkdirSync(path.dirname(p), { recursive: true });
  writeFileSync(p, html);
};

const routes: string[] = allRoutes();
for (const route of routes) {
  const html = page(renderHead(route, getMeta(route)), render(route));
  if (route === "/") write("index.html", html);
  else {
    // /platform -> platform.html is served by GitHub Pages at /platform with a 200.
    write(`${route.slice(1)}.html`, html);
    // public/blog/ is a directory, so Pages may redirect /blog -> /blog/; cover both.
    if (route === "/blog") write("blog/index.html", html);
  }
}

write(
  "404.html",
  page(
    `<title>Page not found — Enclava.dev</title>\n    <meta name="robots" content="noindex" />`,
    render("/404"),
  ),
);

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`).join("\n")}
</urlset>
`,
);

rmSync(serverOut, { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes + 404.html + sitemap.xml`);
