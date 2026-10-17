import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const SITE_URL = "https://enclava.dev";
const OG_IMAGE = `${SITE_URL}/opengraph.jpg?v=2`;
const SUFFIX = " — Enclava.dev";

export interface PageMeta {
  title: string;
  description: string;
  type?: "website" | "article";
  jsonLd?: object[];
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Enclava Labs",
  url: "https://enclava-labs.com/",
  logo: `${SITE_URL}/apple-touch-icon.png`,
  sameAs: [
    "https://x.com/EnclavaLabs",
    "https://www.linkedin.com/company/enclava-labs/",
    "https://github.com/enclava-labs/",
  ],
};

const pages: Record<string, PageMeta> = {
  "/": {
    title: "Enclava.dev — Confidential Applications Platform",
    description:
      "Push a container and run it inside a hardware-isolated trusted execution environment on AMD SEV-SNP. Your code, data and secrets stay invisible to us and the cloud, and anyone can verify it.",
    jsonLd: [
      organization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Enclava.dev",
        url: `${SITE_URL}/`,
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "SoftwareApplication",
        name: "Enclava",
        url: `${SITE_URL}/`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux",
        description:
          "Open-source confidential applications platform. Deploy containers into AMD SEV-SNP trusted execution environments with remote attestation, encrypted storage and sealed secrets.",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
    ],
  },
  "/platform": {
    title: "Platform: The PaaS for Confidential Apps" + SUFFIX,
    description:
      "Enclava runs your containers inside AMD SEV-SNP trusted execution environments and handles attestation, encrypted storage, sealed secrets, TLS, domains and orchestration.",
  },
  "/use-cases": {
    title: "Use Cases for Confidential Computing" + SUFFIX,
    description:
      "Agents, regulated SaaS, encrypted databases and more. If it's a Linux container, Enclava can run it confidentially inside a hardware TEE.",
  },
  "/services": {
    title: "Confidential Computing Services" + SUFFIX,
    description:
      "Our engineers onboard your existing apps to confidential infrastructure and build new confidential apps with you, so your team can focus on the product.",
  },
  "/get-started": {
    title: "Deploy Your First Confidential App" + SUFFIX,
    description:
      "Two ways to start with Enclava: request hosted access to the managed platform, or self-host the open-source engine on your own SEV-SNP hardware.",
  },
  "/blog": {
    title: "Blog" + SUFFIX,
    description:
      "Articles on confidential computing, trusted execution environments, AMD SEV-SNP, remote attestation and building confidential applications.",
  },
  "/privacy": {
    title: "Privacy Policy" + SUFFIX,
    description: "How Enclava Labs collects, uses and protects personal data on enclava.dev and the Enclava platform.",
  },
  "/terms": {
    title: "Terms of Service" + SUFFIX,
    description: "The terms that govern your use of enclava.dev and the Enclava confidential applications platform.",
  },
};

export function getMeta(path: string): PageMeta | undefined {
  if (pages[path]) return pages[path];
  const slug = path.match(/^\/blog\/([^/]+)$/)?.[1];
  const post = slug && getPostBySlug(slug);
  if (!post) return undefined;
  return {
    title: post.title + SUFFIX,
    description: post.description,
    type: "article",
    jsonLd: [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: SITE_URL + path,
        image: OG_IMAGE,
        author: { "@type": "Organization", name: post.author || "Enclava Labs" },
        publisher: organization,
        keywords: post.tags?.join(", "),
      },
    ],
  };
}

export function allRoutes(): string[] {
  return [...Object.keys(pages), ...getAllPosts().map((p) => `/blog/${p.slug}`)];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function renderHead(path: string, meta: PageMeta): string {
  const url = SITE_URL + path;
  const jsonLd = [...(meta.jsonLd ?? []), breadcrumbs(path, meta)].filter(Boolean);
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:type" content="${meta.type ?? "website"}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:site_name" content="Enclava.dev" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@EnclavaLabs" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd }).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

function breadcrumbs(path: string, meta: PageMeta) {
  if (path === "/") return null;
  const items = [{ name: "Home", url: `${SITE_URL}/` }];
  if (path.startsWith("/blog/")) items.push({ name: "Blog", url: `${SITE_URL}/blog` });
  items.push({ name: meta.title.replace(SUFFIX, ""), url: SITE_URL + path });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}
