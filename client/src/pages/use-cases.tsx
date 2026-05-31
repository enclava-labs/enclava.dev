import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    id: "private-ai",
    eyebrow: "Warm market · Featured",
    title: "Private AI, inference & agents",
    body: "Run LLMs, embedding pipelines, RAG stacks, agentic workflows, and fine-tuning jobs without your prompts, training data, or model weights ever being readable by the host. Same OpenAI-compatible APIs your team already uses, with cryptographic guarantees underneath.",
    fits: [
      "Internal copilots over private knowledge",
      "Customer-facing AI where prompts are sensitive",
      "Inference on regulated data (health, finance, legal)",
      "Agents that hold long-lived API keys",
      "Fine-tuning on proprietary datasets",
    ],
    proof: "We deploy our internal copilot here. Legal stopped asking questions.",
  },
  {
    id: "regulated-saas",
    eyebrow: "02",
    title: "Regulated SaaS",
    body: "Health, finance, legal, gov. Customers want cryptographic proof that even your engineers can't see their data. The alternative is rebuilding your stack on-prem for every deal — which kills your margins and your roadmap.",
    fits: [
      "HIPAA, GDPR, SOC2 + cryptographic trust boundary",
      "Multi-tenant SaaS with per-tenant attestation",
      "Audit trails that prove what code processed the data",
      "Customers with data-residency hard requirements",
    ],
  },
  {
    id: "encrypted-databases",
    eyebrow: "03",
    title: "Encrypted databases &amp; stateful workloads",
    body: "Postgres, Redis, Mongo, Kafka — anything that holds state. Persistent volumes are encrypted with keys only the TEE can derive. Ops doesn't need root in your data; rogue insiders can't snapshot it; backups are sealed.",
    fits: [
      "Production databases with PII / PHI / PCI",
      "Long-running workers and queues",
      "Caches that hold session tokens",
      "Self-hosted vector DBs over private corpora",
    ],
  },
  {
    id: "internal-tools",
    eyebrow: "04",
    title: "Internal tools that handle PII",
    body: "Admin dashboards, support consoles, BI tools. Run them where the people who need them can use them — but where no one (including the cloud operator, including a compromised employee laptop) can quietly export the database.",
    fits: [
      "Customer support consoles",
      "BI dashboards on raw user data",
      "Internal admin tools",
      "Data labeling / annotation platforms",
    ],
  },
  {
    id: "secret-workers",
    eyebrow: "05",
    title: "Secret-bearing workers",
    body: "Workers that hold long-lived secrets: signing keys, payment processor credentials, webhook HMACs, third-party API tokens. The secrets live inside the TEE and are unsealed only at runtime; even the platform operator can't read them at rest.",
    fits: [
      "Code-signing pipelines",
      "Payment-processing workers",
      "Webhook senders/receivers",
      "Third-party integration glue",
    ],
  },
  {
    id: "mpc",
    eyebrow: "06",
    title: "Multi-party computation",
    body: "Two (or more) companies want joint analytics on each other's data without either side handing over the raw rows. Deploy the joint workload here; everyone verifies the same attestation; nobody can read the inputs — including us.",
    fits: [
      "Data clean rooms",
      "Joint fraud / risk modeling",
      "Federated analytics across orgs",
      "Verifiable benchmarking between competitors",
    ],
  },
  {
    id: "self-hosted",
    eyebrow: "07",
    title: "Self-hosting, but actually private",
    body: "Run open-source apps where the cloud operator can't see what you do. \"Self-hosted\" finally means it — without you having to operate Kubernetes, hardware, attestation, and key management yourself.",
    fits: [
      "Mattermost, Vaultwarden, Plausible, n8n",
      "Personal note-taking and journaling",
      "Private code forges and CI runners",
      "Confidential community infrastructure",
    ],
  },
];

export default function UseCases() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(700px circle at 20% 30%, hsla(160, 84%, 39%, 0.10), transparent 60%)",
            }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                Use cases
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-medium text-white leading-[0.95] tracking-tighter mb-8">
                Software
                <br />
                <span className="text-muted-foreground">that can't leak.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
                Enclava takes any container. Below are the workloads our users
                bring on day one — but the platform isn't opinionated about
                what runs on it. If it's a Linux container, it can run
                confidentially.
              </p>
            </div>
          </div>
        </section>

        {/* Sections */}
        {sections.map((s, i) => (
          <motion.section
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`py-24 ${i > 0 ? "border-t border-white/5" : ""} scroll-mt-32`}
          >
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-5">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                    {s.eyebrow}
                  </span>
                  <h2
                    className="text-4xl md:text-5xl font-display font-medium text-white mt-4 mb-6 leading-[1.05] tracking-tight"
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    {s.body}
                  </p>
                  {s.proof && (
                    <div className="mt-6 pt-6 border-t border-border italic text-muted-foreground text-sm">
                      "{s.proof}"
                    </div>
                  )}
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="border border-border">
                    <div className="px-6 py-4 border-b border-border bg-card">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                        Good fit when you have
                      </span>
                    </div>
                    <ul>
                      {s.fits.map((f, j) => (
                        <li
                          key={j}
                          className={`px-6 py-4 text-[14px] text-white flex items-start gap-4 ${
                            j !== s.fits.length - 1
                              ? "border-b border-border"
                              : ""
                          }`}
                        >
                          <span className="font-mono text-primary text-[11px] mt-1">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* CTA */}
        <section className="py-32 border-t border-white/5 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-[1.0] tracking-tight">
              Don't see your workload?
              <br />
              <span className="text-muted-foreground">
                It probably still fits.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              The platform takes any Linux container. If you can describe what
              you want to run, we can show you how it runs confidentially.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/get-started">
                <Button className="rounded-none font-mono bg-primary text-background hover:bg-primary/90 h-12 px-6">
                  Deploy your first app <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="rounded-none font-mono border-white/15 text-white hover:bg-white/5 h-12 px-6"
                >
                  Talk to our team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
