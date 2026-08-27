import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Check, Terminal, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@/lib/supabase";

function WaitlistForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const result = await submitLead(email, source);
      if (result.status === "ok" || result.status === "duplicate") {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3 text-primary">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="font-mono text-sm">You're on the list.</span>
        </div>
        <a
          href="https://cal.com/aljaz/enclava"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="w-full h-12 rounded-none text-sm border-white/10 hover:bg-white/5 hover:text-white transition-all font-mono"
          >
            Book a 1:1 (optional)
          </Button>
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="h-12 px-4 rounded-none text-sm bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary focus:ring-primary font-mono"
      />
      <Button
        type="submit"
        disabled={status === "loading" || !email.trim()}
        className="w-full h-12 rounded-none text-sm bg-primary text-background hover:bg-primary/90 transition-all font-mono disabled:opacity-50"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Get access <ArrowRight className="ml-2 w-4 h-4" />
          </>
        )}
      </Button>
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-xs font-mono"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

const paths = [
  {
    icon: Terminal,
    eyebrow: "Path 01",
    title: "Deploy your first app",
    body: "Request access to the hosted platform. Push a container, get a confidential application running on a TLS endpoint. The fastest way to see what Enclava actually does.",
    bullets: [
      "Invite-only beta, no card required",
      "OCI containers — bring any image",
      "TLS, custom domains, encrypted volumes included",
      "Public attestation per deploy",
    ],
    cta: <WaitlistForm source="get-started-deploy" />,
    note: "We're onboarding teams in waves. You'll usually hear back within a day.",
  },
  {
    icon: Cloud,
    eyebrow: "Path 02",
    title: "Run the engine yourself",
    body: "The deploy engine is open source. If you operate your own SEV-SNP-capable hardware (or you want to white-label), self-host the platform and skip our managed cloud entirely.",
    bullets: [
      "Open source, MIT-licensed engine",
      "Runs on your own AMD SEV-SNP clusters",
      "Brand it / resell it as your own product",
      "Documentation + community support",
    ],
    cta: (
      <a
        href="https://docs.enclava.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button className="w-full h-12 rounded-none text-sm bg-secondary text-white hover:bg-secondary/90 transition-all font-mono">
          Read the docs <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </a>
    ),
    note: "Best when you already operate Kubernetes and SEV-SNP hardware.",
  },
];

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px circle at 50% 20%, hsla(190, 95%, 50%, 0.18), transparent 60%), radial-gradient(700px circle at 90% 80%, hsla(160, 84%, 45%, 0.10), transparent 65%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-screen"
              style={{
                backgroundImage:
                  "radial-gradient(hsla(190,90%,55%,0.6) 1px, transparent 1.5px)",
                backgroundSize: "32px 32px",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                Get started
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[0.95] tracking-tighter mb-6">
                Deploy your
                <br />
                <span className="text-muted-foreground">first confidential app.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Two paths in — managed or self-hosted. Pick the one that
                matches how much of the infra you want to run yourself.
              </p>
            </div>
          </div>
        </section>

        {/* Paths */}
        <section className="pb-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-4">
              {paths.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group rounded-xl bg-card/40 backdrop-blur-sm border border-white/[0.06] p-8 lg:p-10 flex flex-col shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] hover:bg-card/60 hover:border-primary/25 transition-all duration-300"
                >
                  <p.icon className="w-7 h-7 text-primary mb-6 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                    {p.eyebrow}
                  </span>
                  <h2 className="text-2xl font-display font-medium text-white mt-3 mb-4 leading-tight">
                    {p.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {p.body}
                  </p>
                  <ul className="space-y-3 mb-8 border-t border-white/[0.06] pt-6">
                    {p.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-xs text-gray-300"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto space-y-3">
                    {p.cta}
                    <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                      {p.note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What happens next */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                "radial-gradient(800px circle at 20% 50%, hsla(190, 90%, 45%, 0.08), transparent 65%)",
            }}
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
                What happens next
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-8 leading-tight tracking-tight">
                If you choose path 01.
              </h2>
              <ol className="space-y-4 border-l border-primary/30 pl-6">
                {[
                  "We send you credentials and a quickstart link.",
                  "You install the CLI and run enclava deploy with any container.",
                  "Your app boots inside a TEE with TLS and a public URL.",
                  "You verify the attestation, share it with your team, ship.",
                ].map((step, i) => (
                  <li key={i} className="text-[15px] text-white flex gap-4">
                    <span className="font-mono text-primary text-xs mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
