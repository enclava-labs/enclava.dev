import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogoTicker from "@/components/landing/LogoTicker";
import Features from "@/components/landing/Features";
import PlatformBento from "@/components/landing/PlatformBento";
import Services from "@/components/landing/Services";
import StatsQuote from "@/components/landing/StatsQuote";
import Footer from "@/components/landing/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function FinalCTA() {
  return (
    <section className="relative py-24 md:py-[150px] text-center overflow-hidden">
      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background:
            "radial-gradient(700px 380px at 50% 100%, hsla(190, 90%, 50%, 0.14), transparent 70%), radial-gradient(500px 300px at 50% 100%, hsla(160, 84%, 45%, 0.08), transparent 70%)",
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.6rem,7vw,5.75rem)] font-display font-extrabold tracking-[-0.04em] leading-[0.98] text-white"
        >
          Push a container.
          <br />
          <span className="text-muted-foreground/70">Get a confidential app.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 md:mt-7 text-muted-foreground text-lg max-w-md mx-auto"
        >
          Early access is open. Bring a workload that can't leak.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-3.5 justify-center"
        >
          <Link href="/get-started">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 rounded-full text-[15px] font-mono bg-primary text-primary-foreground border-none hover:bg-primary/90 hover:shadow-[0_0_28px_hsla(190,90%,50%,0.45)] hover:-translate-y-0.5 transition-all"
            >
              Request access <ArrowRight className="ml-1" />
            </Button>
          </Link>
          <a href="https://docs.enclava.dev">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 rounded-full text-[15px] font-mono border-white/15 bg-card/40 text-white hover:border-primary hover:bg-primary/10 transition-all"
            >
              Read the docs
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Features />
        <PlatformBento />
        <Services />
        <StatsQuote />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
