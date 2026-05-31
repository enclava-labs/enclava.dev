import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Server, Lock, Layers, GitBranch, Network } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Terminal,
    title: "Declarative deploys",
    body: "Describe your app in one file: image, resources, volumes, domain. Push from your laptop or your CI. Same workflow whether you're shipping a web app, a database, or an inference server.",
  },
  {
    icon: Lock,
    title: "Sealed secrets",
    body: "Secrets are encrypted on your machine and unsealed only inside the running TEE. They never sit in plaintext in our control plane, our database, or our logs.",
  },
  {
    icon: Server,
    title: "Encrypted persistent volumes",
    body: "Stateful workloads — databases, caches, queues — keep their data on disk, encrypted with keys only the TEE can derive. Restart, scale, migrate; the data stays sealed.",
  },
  {
    icon: Layers,
    title: "Built-in TLS & domains",
    body: "Custom domains, ACME certificates, ingress — all handled. TLS terminates inside the TEE so your traffic is never decrypted on shared infrastructure.",
  },
  {
    icon: GitBranch,
    title: "Verifiable releases",
    body: "Every deploy emits a public attestation pinning the exact image running inside the TEE (AMD SEV-SNP / Intel TDX). Customers, auditors, or you can verify it without trusting us.",
  },
  {
    icon: Network,
    title: "Network isolation",
    body: "Pod-to-pod policies, internal-only services, egress controls. Workloads are isolated by default; you opt in to what crosses the boundary.",
  },
];

export default function Platform() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px circle at 80% 20%, hsla(190, 95%, 50%, 0.18), transparent 60%), radial-gradient(700px circle at 5% 90%, hsla(160, 84%, 45%, 0.10), transparent 65%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.10] mix-blend-screen"
              style={{
                backgroundImage:
                  "radial-gradient(hsla(190,90%,55%,0.6) 1px, transparent 1.5px)",
                backgroundSize: "32px 32px",
                maskImage:
                  "radial-gradient(ellipse 80% 60% at 70% 30%, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 60% at 70% 30%, black 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                The Platform
              </span>
              <h1 className="text-5xl md:text-8xl font-display font-medium text-white leading-[0.95] tracking-tighter mb-8">
                The PaaS for
                <br />
                <span className="text-muted-foreground">confidential apps.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
                Enclava is a deployment platform that runs your containers
                inside trusted execution environments (TEEs) on AMD SEV-SNP and
                Intel TDX. You bring an image — we handle attestation,
                encrypted storage, sealed secrets, TLS, domains, and the gnarly
                orchestration underneath.
                <span className="block mt-4 text-white">
                  The same workflow you have on a normal cloud, but the cloud
                  can't see your data.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Two products */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(800px circle at 20% 30%, hsla(190, 90%, 45%, 0.08), transparent 65%), radial-gradient(800px circle at 80% 70%, hsla(160, 84%, 45%, 0.08), transparent 65%)",
              }}
            />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="rounded-xl p-10 lg:p-12 bg-card/40 backdrop-blur-sm border border-white/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                  For developers
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-medium text-white mt-4 mb-4 leading-tight">
                  The CLI &amp; managed cloud
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Install <code className="font-mono text-primary">enclava</code>,
                  point it at a container image, and your app is running in a
                  hardware TEE with TLS, attested release, and encrypted
                  volumes — in one command.
                </p>
                <pre className="bg-background/60 backdrop-blur-sm border border-white/[0.06] rounded-md p-4 font-mono text-[12.5px] leading-7 text-white whitespace-pre-wrap mb-6">
<span className="text-primary">$</span> brew install enclava
<span className="text-primary">$</span> enclava deploy myapp ghcr.io/me/app:latest
<span className="text-secondary">▸ live at https://myapp.enclava.dev</span>
                </pre>
                <Link href="/get-started">
                  <Button className="rounded-none font-mono bg-primary text-background hover:bg-primary/90 h-12 px-6">
                    Deploy your first app <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="rounded-xl p-10 lg:p-12 bg-card/40 backdrop-blur-sm border border-white/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                  For infrastructure providers
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-medium text-white mt-4 mb-4 leading-tight">
                  The deploy engine
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The orchestration layer that makes confidential deploys
                  work — manifest generation, attestation, encrypted storage,
                  ingress — is open-source. Run it on your own SEV-SNP / TDX
                  hardware, brand it, resell it. Every confidential cloud
                  needs this layer; you don't have to build it.
                </p>
                <ul className="space-y-3 mb-6 border-l border-white/10 pl-6 text-sm text-muted-foreground">
                  <li>
                    <span className="text-white block mb-0.5">Bring your own hardware</span>
                    Run on any SEV-SNP or TDX-capable cluster.
                  </li>
                  <li>
                    <span className="text-white block mb-0.5">White-label</span>
                    Your brand, your control plane, our engine underneath.
                  </li>
                  <li>
                    <span className="text-white block mb-0.5">Open source</span>
                    Audit it, fork it, contribute back.
                  </li>
                </ul>
                <a
                  href="https://github.com/enclava-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="rounded-none font-mono border-white/15 text-white hover:bg-white/5 h-12 px-6"
                  >
                    View on GitHub
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px circle at 15% 25%, hsla(190, 90%, 45%, 0.10), transparent 65%), radial-gradient(800px circle at 90% 80%, hsla(160, 84%, 45%, 0.08), transparent 65%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsla(190,90%,55%,0.5) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mb-20">
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                What you get
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-[1.0] tracking-tight">
                Everything underneath,
                <br />
                <span className="text-muted-foreground">handled for you.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="group rounded-xl p-8 bg-card/40 backdrop-blur-sm border border-white/[0.06] hover:bg-card/70 hover:border-primary/30 hover:shadow-[0_20px_60px_-30px_hsla(190,90%,45%,0.4)] transition-all duration-300"
                >
                  <c.icon className="w-6 h-6 text-primary mb-5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                  <h3 className="text-xl font-display font-medium text-white mb-3">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                "radial-gradient(800px 500px at 50% 50%, hsla(190, 95%, 50%, 0.14), transparent 70%)",
            }}
          />
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6 tracking-tight">
              Want to see it deploy something of yours?
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/get-started">
                <Button className="rounded-none font-mono bg-primary text-background hover:bg-primary/90 h-12 px-6">
                  Deploy your first app <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/use-cases">
                <Button
                  variant="outline"
                  className="rounded-none font-mono border-white/15 text-white hover:bg-white/5 h-12 px-6"
                >
                  See use cases
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
