import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Boxes, Wrench, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const services = [
  {
    icon: Boxes,
    eyebrow: "Onboarding",
    title: "We migrate your app, end-to-end",
    body: "You bring an existing application — a SaaS, a database, an ML pipeline, an internal tool. We move it onto confidential infrastructure for you. You don't learn attestation, KBS, or encrypted volumes; you just keep shipping features.",
    deliverables: [
      "Audit of your current stack and data flows",
      "Containerization (if you're not already there)",
      "Production deploy on confidential infrastructure",
      "Runbooks, monitoring, on-call handover",
      "Customer-facing attestation collateral",
    ],
  },
  {
    icon: Wrench,
    eyebrow: "Custom development",
    title: "We build confidential apps with you",
    body: "Some apps are confidential-native: data clean rooms, joint analytics, regulated AI products, key-management services. We design and build them alongside your team — from threat model to shipped product — so the cryptographic guarantees are baked in, not bolted on.",
    deliverables: [
      "Threat modeling & trust boundary design",
      "Architecture you can defend to auditors",
      "Reference implementations of confidential patterns",
      "Knowledge transfer to your engineers",
      "Ongoing engineering support after launch",
    ],
  },
  {
    icon: ShieldCheck,
    eyebrow: "Compliance & assurance",
    title: "We help your customers verify",
    body: "Your customers' security teams need to understand what they're trusting. We produce the documentation, attestation flows, and live demos that turn \"trust us\" into \"verify it yourself\" — so deals close faster and audits stop blocking releases.",
    deliverables: [
      "Public attestation pipelines",
      "Customer-facing trust documentation",
      "SOC 2 / HIPAA / ISO mapping",
      "Live verification demos for procurement",
      "Auditor briefing materials",
    ],
  },
];

export default function ServicesPage() {
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
                "radial-gradient(700px circle at 80% 20%, hsla(190, 90%, 45%, 0.10), transparent 60%)",
            }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                White-glove services
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-medium text-white leading-[0.95] tracking-tighter mb-8">
                We do
                <br />
                <span className="text-muted-foreground">the hard parts.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
                Most teams want confidential applications, not a confidential
                computing PhD. Our engineers onboard your existing apps to
                confidential infrastructure and build new confidential apps
                alongside you — so your team focuses on the product, not the
                trust boundary.
                <span className="block mt-4 text-white">
                  You ship. We make sure it ships confidentially.
                </span>
              </p>
              <div className="flex gap-4 mt-10 flex-wrap">
                <Link href="/get-started">
                  <Button className="rounded-none font-mono bg-primary text-background hover:bg-primary/90 h-12 px-6">
                    Talk to our team <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services list */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6 space-y-16">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid lg:grid-cols-12 gap-10 lg:gap-16 border border-border bg-card/30 p-8 lg:p-14"
              >
                <div className="lg:col-span-5">
                  <s.icon className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                    {s.eyebrow}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-medium text-white mt-4 mb-5 leading-[1.1] tracking-tight">
                    {s.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {s.body}
                  </p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="border border-border">
                    <div className="px-5 py-3 bg-card border-b border-border">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                        Engagement includes
                      </span>
                    </div>
                    <ul>
                      {s.deliverables.map((d, j) => (
                        <li
                          key={j}
                          className={`px-5 py-4 flex items-start gap-4 text-[14px] text-white ${
                            j !== s.deliverables.length - 1
                              ? "border-b border-border"
                              : ""
                          }`}
                        >
                          <span className="font-mono text-primary text-[11px] mt-1">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process strip */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                How we work
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-[1.05]">
                Small team. <span className="text-muted-foreground">Tight loops.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-px bg-border border border-border">
              {[
                {
                  n: "01",
                  t: "Discovery call",
                  b: "30 minutes. We learn your stack, your data, your constraints. No slides.",
                },
                {
                  n: "02",
                  t: "Scoped proposal",
                  b: "A short doc with the plan, the price, and the timeline. Fixed-fee where we can.",
                },
                {
                  n: "03",
                  t: "Engineering",
                  b: "Senior engineers ship in your repo. Weekly demos, direct Slack, no account managers.",
                },
                {
                  n: "04",
                  t: "Handover",
                  b: "Runbooks, on-call, knowledge transfer. We're around when you need us, not when you don't.",
                },
              ].map((s) => (
                <div key={s.n} className="bg-background p-8">
                  <div className="font-mono text-[11px] tracking-[0.2em] text-primary mb-4">
                    {s.n}
                  </div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    {s.t}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 border-t border-white/5 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-[1.0] tracking-tight">
              Have an app that
              <br />
              <span className="text-muted-foreground">should be confidential?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Tell us what you're running. We'll tell you what it takes to
              move it onto confidential infrastructure — honestly.
            </p>
            <Link href="/get-started">
              <Button className="rounded-none font-mono bg-primary text-background hover:bg-primary/90 h-12 px-8">
                Talk to our team <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
