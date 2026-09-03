import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";

const META = ["Encrypted in use", "Encrypted at rest", "Attestation verifiable", "AMD SEV-SNP"];

export default function Hero() {
  return (
    <section className="relative pt-[150px] md:pt-[200px] pb-16 md:pb-24 text-center overflow-hidden">
      {/* Atmosphere: cyan/teal washes + dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 420px at 50% -6%, hsla(190, 90%, 50%, 0.16), transparent 70%), radial-gradient(560px 400px at 82% 18%, hsla(160, 84%, 45%, 0.10), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(hsla(190, 70%, 60%, 0.28) 1px, transparent 1.4px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 62% 46% at 50% 8%, black, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 62% 46% at 50% 8%, black, transparent 72%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.8rem,8.2vw,6.5rem)] font-display font-bold tracking-tighter leading-none text-white mb-7"
        >
          Ship any app.
          <br />
          <span className="gradient-text">Confidentially.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Push a container. We run it inside a hardware-isolated trusted
          execution environment on AMD SEV-SNP. Your code, your data, your
          secrets — invisible to us, invisible to the cloud, verifiable by
          anyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3.5 justify-center sm:max-w-md mx-auto mb-8"
        >
          <Link href="/get-started" className="flex-1 sm:flex-none">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 rounded-full text-[15px] font-mono bg-primary text-primary-foreground border-none hover:bg-primary/90 hover:shadow-[0_0_28px_hsla(190,90%,50%,0.45)] hover:-translate-y-0.5 transition-all"
            >
              Request access <ArrowRight className="ml-1" />
            </Button>
          </Link>
          <a href="#how-it-works" className="flex-1 sm:flex-none">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 rounded-full text-[15px] font-mono border-white/15 bg-card/40 text-white hover:border-primary hover:bg-primary/10 transition-all"
            >
              See how it works
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-x-7 gap-y-3 font-mono text-xs text-muted-foreground/80 mb-10 md:mb-14"
        >
          {META.map((m) => (
            <span key={m} className="inline-flex items-center gap-2">
              <span className="w-[5px] h-[5px] rounded-full bg-secondary shadow-[0_0_8px_hsl(160_84%_39%)]" />
              {m}
            </span>
          ))}
        </motion.div>

        {/* One-line command hint */}
        <motion.a
          href="#how-it-works"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="inline-flex items-center gap-3 font-mono text-sm text-muted-foreground bg-card border border-border rounded-xl px-6 py-3.5 shadow-[0_16px_40px_-18px_hsla(223,45%,4%,0.7)] hover:border-primary/50 hover:-translate-y-0.5 transition-all"
        >
          <span>
            <span className="text-primary">$</span> enclava deploy myapp
          </span>
          <span className="inline-block w-2 h-[17px] bg-primary shadow-[0_0_8px_hsla(190,90%,50%,0.7)] animate-blink" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 md:mt-12 flex flex-col items-center gap-2.5"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60">
            scroll to deploy
          </span>
          <ArrowDown className="w-4 h-4 text-primary animate-bob" />
        </motion.div>
      </div>
    </section>
  );
}
