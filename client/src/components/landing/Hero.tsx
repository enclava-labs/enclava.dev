import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroBg from "/images/abstract_secure_confidential_computing_visualization.png";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background — atmosphere layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-background"></div>

        {/* Hero image: bigger, brighter, with a slow scroll parallax */}
        <motion.div
          style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.55] mix-blend-screen"
          />
        </motion.div>

        {/* Faint engineered grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(hsla(190,90%,55%,0.4) 1px, transparent 1px), linear-gradient(90deg, hsla(190,90%,55%,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 70% 35%, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 70% 35%, black 0%, transparent 75%)",
          }}
        ></div>

        {/* Volumetric light blooms */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px circle at 78% 32%, hsla(190, 95%, 55%, 0.22), transparent 60%), radial-gradient(700px circle at 8% 85%, hsla(160, 84%, 45%, 0.14), transparent 65%), radial-gradient(500px circle at 50% 110%, hsla(190, 90%, 45%, 0.10), transparent 70%)",
          }}
        ></div>

        {/* Edge falloff to seat the scene into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-primary font-mono text-xs tracking-widest uppercase">
                Confidential Applications Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-medium tracking-tighter leading-[0.9] text-white"
            >
              Ship any app. <br />
              <span className="text-muted-foreground">Confidentially.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6"
            >
              Deploy your containers and we run them inside trusted execution
              environments (TEEs) on AMD SEV-SNP and Intel TDX. Your code, your
              data, your secrets — invisible to us, invisible to the cloud,
              verifiable by anyone.
              <span className="block mt-4 text-white">
                Push a container. Get a confidential application.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-none text-base bg-primary text-background hover:bg-primary/90 transition-all font-mono"
                >
                  Deploy your first app <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-none text-base border-white/15 text-white hover:bg-white/5 font-mono"
                >
                  See how it works
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-x-8 gap-y-3 pt-6 font-mono text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_12px_hsl(160_84%_39%)]"></span>
                Encrypted in use
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_12px_hsl(160_84%_39%)]"></span>
                Encrypted at rest
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_12px_hsl(160_84%_39%)]"></span>
                Attestation verifiable
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_12px_hsl(160_84%_39%)]"></span>
                AMD SEV-SNP · Intel TDX
              </span>
            </motion.div>
          </div>

          {/* Right: terminal demo */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotateY: -8 }}
              animate={{ opacity: 1, scale: 1, rotateY: -4 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ transformPerspective: 1200 }}
              className="relative"
            >
              <div className="absolute -top-8 left-0 inline-flex gap-2 items-center px-3 py-1.5 border border-border rounded-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-background/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(190_90%_45%)] animate-pulse"></span>
                live deploy
              </div>
              <div className="bg-card border border-border shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-muted"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-muted"></span>
                  <span className="ml-3 font-mono text-xs text-muted-foreground">
                    ~/my-app · enclava cli
                  </span>
                </div>
                <pre className="p-6 font-mono text-[13px] leading-[1.75] whitespace-pre-wrap text-white">
<span className="text-primary">$</span> enclava deploy myapp ghcr.io/me/app:latest
<span className="text-muted-foreground">→ resolving image digest…           </span><span className="text-secondary">ok</span>
<span className="text-muted-foreground">→ verifying signature…              </span><span className="text-secondary">ok</span>
<span className="text-muted-foreground">→ provisioning encrypted volume…    </span><span className="text-secondary">ok</span>
<span className="text-muted-foreground">→ launching TEE (SEV-SNP)…          </span><span className="text-secondary">ok</span>
<span className="text-muted-foreground">→ attestation verified              </span><span className="text-secondary">✓</span>

<span className="text-primary">▸</span> https://myapp.enclava.dev
<span className="text-muted-foreground">  encrypted in use · 4 vCPU · 8 GiB</span>

<span className="text-primary">$</span> enclava config set myapp DB_URL=…
<span className="text-muted-foreground">  secret delivered direct-to-enclave</span>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
