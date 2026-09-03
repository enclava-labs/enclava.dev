import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Token = { t: "cmd" | "dim" | "ok" | "text"; text: string };

const STEPS = [
  {
    num: "STEP 01",
    title: "Describe your app",
    body: "One declarative file: image, resources, domains, persistent volumes. Same mental model you already have for Docker Compose or any modern PaaS.",
    pills: null as string[] | null,
    pane: [
      [{ t: "cmd", text: "$ " }, { t: "text", text: "cat enclava.toml" }],
      [{ t: "text", text: 'name = ' }, { t: "ok", text: '"myapp"' }],
      [{ t: "text", text: "image = " }, { t: "ok", text: '"ghcr.io/me/app:latest"' }],
      [{ t: "text", text: "resources = { cpu = 4, memory = " }, { t: "ok", text: '"8Gi"' }, { t: "text", text: " }" }],
      [{ t: "text", text: "volumes.data = " }, { t: "ok", text: '"/var/lib/app"' }],
      [{ t: "text", text: "domain = " }, { t: "ok", text: '"app.acme.com"' }],
    ] as Token[][],
  },
  {
    num: "STEP 02",
    title: "We verify & provision",
    body: "The platform pulls your image, verifies its signature, generates the orchestration to run it inside a TEE on AMD SEV-SNP, and provisions encrypted storage with keys only the TEE holds.",
    pills: ["signed image", "encrypted volume", "isolated network"],
    pane: [
      [{ t: "cmd", text: "$ " }, { t: "text", text: "enclava deploy myapp" }],
      [{ t: "dim", text: "→ resolving image digest…        " }, { t: "ok", text: "ok" }],
      [{ t: "dim", text: "→ verifying signature…           " }, { t: "ok", text: "ok" }],
      [{ t: "dim", text: "→ generating manifests…          " }, { t: "ok", text: "ok" }],
      [{ t: "dim", text: "→ provisioning encrypted volume  " }, { t: "ok", text: "ok" }],
      [{ t: "dim", text: "→ allocating TEE (SEV-SNP)…     " }, { t: "ok", text: "ok" }],
    ] as Token[][],
  },
  {
    num: "STEP 03",
    title: "Your app boots inside a TEE",
    body: "The container runs in a hardware-isolated trusted execution environment where memory is encrypted at runtime. Even with full root on the host, the cloud operator cannot read your process memory, your filesystem, or your traffic.",
    pills: null,
    pane: [
      [{ t: "cmd", text: "▸ " }, { t: "text", text: "TEE attested" }],
      [{ t: "cmd", text: "▸ " }, { t: "text", text: "volumes unlocked" }],
      [{ t: "cmd", text: "▸ " }, { t: "text", text: "tls terminated " }, { t: "dim", text: "inside" }, { t: "text", text: " TEE" }],
      [{ t: "cmd", text: "▸ " }, { t: "text", text: "https://myapp.enclava.dev  " }, { t: "ok", text: "live" }],
      [{ t: "dim", text: "" }],
      [{ t: "dim", text: "memory: encrypted in use" }],
      [{ t: "dim", text: "host visibility: none" }],
    ] as Token[][],
  },
  {
    num: "STEP 04",
    title: "Secrets flow directly into the TEE",
    body: "API keys, DB credentials, signing keys — encrypted on your laptop, opened only inside the running TEE. They never touch our control plane in plaintext.",
    pills: ["sealed on your machine", "opened in-enclave only"],
    pane: [
      [{ t: "cmd", text: "$ " }, { t: "text", text: "enclava config set myapp \\" }],
      [{ t: "text", text: "    OPENAI_KEY=sk-… \\" }],
      [{ t: "text", text: "    DB_URL=postgres://…" }],
      [{ t: "dim", text: "" }],
      [{ t: "dim", text: "→ wrapped to TEE key…       " }, { t: "ok", text: "ok" }],
      [{ t: "dim", text: "→ delivered                  " }, { t: "ok", text: "✓" }],
      [{ t: "dim", text: "" }],
      [{ t: "dim", text: "plaintext exposure: 0 bytes" }],
    ] as Token[][],
  },
];

function tokenClass(t: Token["t"]) {
  switch (t) {
    case "cmd": return "text-primary";
    case "dim": return "text-muted-foreground/70";
    case "ok": return "text-secondary";
    default: return "text-white";
  }
}

export default function Features() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.pane);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative scroll-mt-24">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-[22px] h-px bg-primary/60" />
            How it works
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[1.05] tracking-tight">
            From{" "}
            <span className="font-mono text-[0.82em] text-primary">docker push</span>
            <br />
            <span className="text-muted-foreground/70">to confidential, in four steps.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            You give us a container. We give you a confidential application —
            reachable on a TLS endpoint, with cryptographic proof of what's
            inside. Scroll through a deploy.
          </p>
        </motion.div>

        {/* Steps + sticky terminal */}
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-11 lg:gap-[72px] items-start">
          {/* Steps */}
          <div>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-pane={i}
                className={`py-7 md:py-8 border-t border-white/[0.07] transition-opacity duration-500 ${
                  i === 0 ? "border-t-0 pt-1" : ""
                } ${active === i ? "opacity-100" : "opacity-40"}`}
              >
                <span className="block font-mono text-[11px] tracking-[0.22em] text-primary mb-4">
                  {step.num}
                </span>
                <h3 className="text-2xl md:text-[32px] font-display font-bold text-white mb-3.5 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[15px] md:text-base text-muted-foreground leading-[1.7] max-w-md">
                  {step.body}
                </p>
                {step.pills && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {step.pills.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-[5px] rounded-full border border-primary/35 bg-card/50 font-mono text-[10.5px] text-muted-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sticky terminal — pins beside steps on desktop, under the nav on mobile */}
          <div className="sticky top-[86px] lg:top-[110px] z-30 order-first lg:order-none mb-4 lg:mb-0">
            <div className="relative rounded-[18px] bg-[hsl(223,33%,7%)] border border-border shadow-[0_40px_90px_-20px_hsla(223,45%,3%,0.8),0_0_60px_-30px_hsla(190,90%,50%,0.35)] overflow-hidden">
              {/* live badge */}
              <div className="absolute -top-[15px] right-5 z-10 inline-flex items-center gap-2 px-[13px] py-1.5 rounded-full font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground bg-card/95 border border-primary/30 shadow-lg backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(190,90%,45%)] animate-pulse" />
                live deploy
              </div>

              {/* window bar + progress dots */}
              <div className="flex items-center gap-2 px-[18px] py-3 border-b border-border bg-background/50">
                <span className="w-[11px] h-[11px] rounded-full bg-muted" />
                <span className="w-[11px] h-[11px] rounded-full bg-muted" />
                <span className="w-[11px] h-[11px] rounded-full bg-muted" />
                <span className="ml-3 font-mono text-xs text-muted-foreground/60">
                  enclava cli · ~/my-app
                </span>
                <span className="ml-auto flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-[7px] h-[7px] rounded-full transition-all duration-300 ${
                        active === i
                          ? "bg-primary shadow-[0_0_8px_hsla(190,90%,50%,0.8)]"
                          : "bg-muted/50"
                      }`}
                    />
                  ))}
                </span>
              </div>

              {/* panes */}
              <div className="p-5 md:px-8 md:py-7 font-mono text-[11px] md:text-[13.5px] leading-[1.9] min-h-[190px] md:min-h-[320px] overflow-x-auto">
                {STEPS.map((step, i) => (
                  <div key={i} className={active === i ? "block" : "hidden"}>
                    {step.pane.map((tokens, li) => (
                      <span
                        key={li}
                        className={`block whitespace-pre opacity-0 ${
                          active === i ? "animate-line-in" : ""
                        }`}
                        style={{ animationDelay: `${0.05 + li * 0.09}s` }}
                      >
                        {tokens.map((tok, ti) => (
                          <span key={ti} className={tokenClass(tok.t)}>
                            {tok.text || "\u00A0"}
                          </span>
                        ))}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
