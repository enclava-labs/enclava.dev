#!/usr/bin/env node
/**
 * Agent readiness for enclava.dev at the Cloudflare edge.
 *
 * The site is hosted on GitHub Pages, which cannot set custom response
 * headers or do Accept-header content negotiation. This script configures
 * the Cloudflare zone (already authoritative for DNS) to provide both:
 *
 *   1. Link response headers (RFC 8288) on the homepage via a Response
 *      Header Transform Rule — agent discovery of /llms.txt and the docs.
 *   2. Markdown for Agents: a worker on `enclava.dev/*` that serves the
 *      prerendered .md twin (script/agent-content-worker.js) when a request
 *      sends Accept: text/markdown. This replaces Cloudflare's built-in
 *      `content_converter` setting, which is Pro+ only.
 *
 * Keep the Link value in sync with AGENT_LINK_HEADER in server/static.ts and
 * the <link> tags in client/src/seo.ts.
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... node script/cloudflare-agent-readiness.mjs [--enable-proxy]
 *
 * Env:
 *   CLOUDFLARE_API_TOKEN     API token with: Account > Account Settings > Read,
 *                            Zone > Zone > Read, Zone > DNS > Edit,
 *                            Zone > Rulesets > Edit, Account > Workers Scripts > Edit,
 *                            Zone > Workers Routes > Edit
 *   CLOUDFLARE_ZONE_ID       optional, skips zone lookup
 *   CLOUDFLARE_ACCOUNT_ID    optional, skips account lookup
 *
 * Flags:
 *   --enable-proxy  Also flip the apex A/AAAA records to proxied=true.
 *                   Everything here only takes effect once the zone is
 *                   proxied. Only do this once the zone SSL mode is "Full"
 *                   or "Full (strict)" (GitHub Pages serves valid certs), or
 *                   the site will break with a redirect loop under "Flexible".
 *
 * Idempotent: safe to run on every deploy. Exits non-zero on API errors.
 * Validates at https://isitagentready.com — linkHeaders and
 * markdownNegotiation checks must pass.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

const HOST = "enclava.dev";
const LINK_VALUE =
  '</llms.txt>; rel="describedby", <https://docs.enclava.dev/>; rel="service-doc"';
const RULE_DESCRIPTION = "agent-discovery-link-headers";
const RULE_EXPRESSION = `(http.host eq "${HOST}" and http.request.uri.path eq "/")`;

const WORKER_NAME = "agent-content";
const WORKER_FILE = "agent-content-worker.js";
const WORKER_ROUTE = `${HOST}/*`;

const API = "https://api.cloudflare.com/client/v4";
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ENABLE_PROXY = process.argv.includes("--enable-proxy");

if (!TOKEN) {
  console.error("Missing CLOUDFLARE_API_TOKEN");
  process.exit(1);
}

async function cf(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    const errors = body?.errors ? JSON.stringify(body.errors) : res.statusText;
    const err = new Error(`${init.method ?? "GET"} ${path} failed: ${errors}`);
    err.status = res.status;
    throw err;
  }
  return body.result;
}

const log = (msg) => console.log(`[cloudflare-agent-readiness] ${msg}`);

async function getZoneId() {
  if (process.env.CLOUDFLARE_ZONE_ID) return process.env.CLOUDFLARE_ZONE_ID;
  const zones = await cf(`/zones?name=${HOST}`);
  if (!zones.length) throw new Error(`Zone ${HOST} not found for this token`);
  return zones[0].id;
}

async function getAccountId() {
  if (process.env.CLOUDFLARE_ACCOUNT_ID) return process.env.CLOUDFLARE_ACCOUNT_ID;
  const accounts = await cf(`/accounts`);
  if (!accounts.length) throw new Error("No accounts visible to this token");
  return accounts[0].id;
}

// --- 1. Link response headers (RFC 8288) ---------------------------------

async function upsertTransformRule(zoneId) {
  const rule = {
    action: "rewrite",
    expression: RULE_EXPRESSION,
    description: RULE_DESCRIPTION,
    enabled: true,
    parameters: {
      response: {
        set: [{ name: "link", value: LINK_VALUE }],
      },
    },
  };

  const existing = await cf(
    `/zones/${zoneId}/rulesets/phases/http_response_headers_transform/entrypoint`,
  ).catch((err) => (err.status === 404 ? null : Promise.reject(err)));

  if (!existing) {
    // No ruleset for this phase yet — create the entrypoint with our rule.
    await cf(`/zones/${zoneId}/rulesets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Agent discovery Link headers",
        kind: "zone",
        phase: "http_response_headers_transform",
        rules: [rule],
      }),
    });
    log("Created response-header transform ruleset with Link rule");
    return;
  }

  const others = (existing.rules ?? []).filter(
    (r) => r.description !== RULE_DESCRIPTION,
  );
  const current = (existing.rules ?? []).find(
    (r) => r.description === RULE_DESCRIPTION,
  );
  const identical =
    current &&
    current.expression === rule.expression &&
    current.action === rule.action &&
    JSON.stringify(current.parameters?.response?.set) ===
      JSON.stringify(rule.parameters.response.set);

  if (identical) {
    log("Link rule already up to date — nothing to do");
    return;
  }

  await cf(`/zones/${zoneId}/rulesets/${existing.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rules: [...others, rule] }),
  });
  log(current ? "Updated Link rule" : "Added Link rule to existing ruleset");
}

// --- 2. Markdown for Agents worker ----------------------------------------

async function deployWorker(zoneId, accountId) {
  const source = await readFile(
    path.join(import.meta.dirname, WORKER_FILE),
    "utf8",
  );

  const form = new FormData();
  form.append(
    "metadata",
    new Blob(
      [
        JSON.stringify({
          main_module: WORKER_FILE,
          compatibility_date: "2026-01-01",
        }),
      ],
      { type: "application/json" },
    ),
  );
  form.append(
    WORKER_FILE,
    new Blob([source], { type: "application/javascript+module" }),
  );

  await cf(`/accounts/${accountId}/workers/scripts/${WORKER_NAME}`, {
    method: "PUT",
    body: form,
  });
  log(`Uploaded worker ${WORKER_NAME}`);

  // Route the whole host through the worker (it passes non-markdown traffic
  // straight to the origin).
  const routes = await cf(`/zones/${zoneId}/workers/routes`);
  const current = routes.find((r) => r.pattern === WORKER_ROUTE);
  if (current && current.script === WORKER_NAME) {
    log(`Route ${WORKER_ROUTE} already points at ${WORKER_NAME}`);
    return;
  }
  if (current) {
    await cf(`/zones/${zoneId}/workers/routes/${current.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pattern: WORKER_ROUTE, script: WORKER_NAME }),
    });
    log(`Repointed route ${WORKER_ROUTE} to ${WORKER_NAME}`);
    return;
  }
  await cf(`/zones/${zoneId}/workers/routes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pattern: WORKER_ROUTE, script: WORKER_NAME }),
  });
  log(`Created route ${WORKER_ROUTE} -> ${WORKER_NAME}`);
}

// --- 3. Prerequisite: proxied DNS ------------------------------------------

async function checkDns(zoneId) {
  const types = ["A", "AAAA"];
  const records = [];
  for (const type of types) {
    const found = await cf(`/zones/${zoneId}/dns_records?type=${type}&name=${HOST}`);
    records.push(...found);
  }
  if (!records.length) {
    log(`WARNING: no apex A/AAAA records found for ${HOST}`);
    return;
  }

  const dnsOnly = records.filter((r) => !r.proxied);
  if (!dnsOnly.length) {
    log("Apex records are proxied — transform rule and worker are active");
    return;
  }

  if (!ENABLE_PROXY) {
    log(
      `WARNING: ${dnsOnly.length} apex record(s) are DNS-only (grey cloud), so ` +
        `traffic bypasses Cloudflare and neither Link headers nor markdown ` +
        `negotiation are served. Re-run with --enable-proxy, or toggle the ` +
        `orange cloud in the dashboard.`,
    );
    return;
  }

  const ssl = await cf(`/zones/${zoneId}/settings/ssl`);
  if (!["full", "strict"].includes(ssl.value)) {
    throw new Error(
      `Refusing to enable proxy: zone SSL mode is "${ssl.value}". ` +
        `Set it to "Full" or "Full (strict)" first, or the site will loop redirects.`,
    );
  }

  for (const record of dnsOnly) {
    await cf(`/zones/${zoneId}/dns_records/${record.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proxied: true }),
    });
  }
  log(`Proxied ${dnsOnly.length} apex record(s) (SSL mode: ${ssl.value})`);
}

const zoneId = await getZoneId();
const accountId = await getAccountId();
await upsertTransformRule(zoneId);
await deployWorker(zoneId, accountId);
await checkDns(zoneId);
log(`Verify: curl -sI https://${HOST}/ | grep -i '^link'`);
log(`Verify: curl -s -H 'Accept: text/markdown' -D - -o /dev/null https://${HOST}/ | grep -i 'content-type'`);
