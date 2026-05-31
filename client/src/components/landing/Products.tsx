import { Link } from "wouter";
import { motion } from "framer-motion";

const cases = [
  {
    num: "01 · Featured",
    title: "Private AI & inference",
    body: "Run LLMs, embedding pipelines, RAG stacks, agents, or fine-tuning jobs without your prompts, training data, or model weights ever being readable by the host.",
    tags: ["LLMs", "RAG", "agents", "fine-tuning"],
    quote: "We deploy our internal copilot here. Legal stopped asking questions.",
    span: "lg:col-span-3",
    featured: true,
  },
  {
    num: "02",
    title: "Regulated SaaS",
    body: "Health, finance, legal, gov. Customers can verify cryptographically that even your engineers can't see their data — without you rebuilding your stack on-prem for every deal.",
    tags: ["HIPAA-aligned", "audit trail", "multi-tenant"],
    span: "lg:col-span-3",
  },
  {
    num: "03",
    title: "Encrypted databases",
    body: "Postgres, Redis, Mongo with persistent volumes encrypted by keys only the TEE holds. Ops doesn't need root in your data.",
    span: "lg:col-span-2",
  },
  {
    num: "04",
    title: "Internal tools handling PII",
    body: "Admin dashboards, support consoles, BI tools. Run them where employees can use them but no one can quietly export.",
    span: "lg:col-span-2",
  },
  {
    num: "05",
    title: "Secret-bearing workers",
    body: "API keys, signing keys, webhook secrets. Workers consume them inside the TEE; the secrets never sit in your env.",
    span: "lg:col-span-2",
  },
  {
    num: "06",
    title: "Multi-party computation",
    body: "Two companies want to run analytics on each other's data without either side handing over raw rows. Deploy the joint workload here; both sides verify the attestation; neither (nor we) can read the inputs.",
    tags: ["clean rooms", "joint analytics", "federated"],
    span: "lg:col-span-3",
  },
  {
    num: "07",
    title: "Self-hosting, but actually private",
    body: "Run open-source apps (Mattermost, Vaultwarden, Plausible, n8n) where the cloud operator can't see what you do. \"Self-hosted\" finally means it.",
    tags: ["open-source", "one-click", "BYO domain"],
    span: "lg:col-span-3",
  },
];

export default function Products() {
  return (
    <section id="use-cases" className="py-32 relative overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px circle at 25% 20%, hsla(190, 95%, 50%, 0.10), transparent 65%), radial-gradient(800px circle at 85% 80%, hsla(160, 84%, 45%, 0.10), transparent 65%)",
          }}
        ></div>
        {/* Subtle geometric scatter */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsla(190,90%,55%,0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
            Use cases
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-[1.0] tracking-tight">
            Built for software
            <br />
            <span className="text-muted-foreground">that can't leak.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            If your workload would be a liability on a normal cloud, it belongs
            on a confidential applications platform. Below are workloads our
            users run today — but the platform takes any container.
          </p>
        </div>

        {/* Floating bento — gapped, glassy, hover-lifts */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className={`group relative overflow-hidden rounded-xl p-9 backdrop-blur-sm transition-all duration-300 ${
                c.span
              } ${
                c.featured
                  ? "bg-gradient-to-br from-primary/[0.10] via-secondary/[0.04] to-transparent border border-primary/25 shadow-[0_20px_60px_-20px_hsla(190,90%,45%,0.35)]"
                  : "bg-card/40 border border-white/[0.06] hover:bg-card/70 hover:border-primary/30 hover:shadow-[0_20px_60px_-30px_hsla(190,90%,45%,0.4)]"
              }`}
            >
              {/* Featured-card sheen */}
              {c.featured && (
                <div
                  className="absolute -top-1/2 -right-1/3 w-[420px] h-[420px] rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, hsla(190,90%,55%,0.18), transparent 70%)",
                  }}
                />
              )}

              <div className="relative">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80 group-hover:text-primary transition-colors">
                  {c.num}
                </div>
                <h3
                  className={`font-display font-medium text-white mt-4 mb-3 leading-tight ${
                    c.featured ? "text-3xl" : "text-xl"
                  }`}
                >
                  {c.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                  {c.body}
                </p>
                {c.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 border border-white/10 font-mono text-[10px] text-muted-foreground rounded-md bg-white/[0.02]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {c.quote && (
                  <div className="mt-6 pt-5 border-t border-white/[0.08] italic text-muted-foreground text-[13px]">
                    "{c.quote}"
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-white transition-colors"
          >
            See all use cases →
          </Link>
        </div>
      </div>
    </section>
  );
}
