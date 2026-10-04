import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export { getMeta, allRoutes, renderHead, SITE_URL } from "./seo";

export function render(path: string): string {
  return renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );
}
