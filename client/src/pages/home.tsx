import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Products from "@/components/landing/Products";
import Services from "@/components/landing/Services";
import Footer from "@/components/landing/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 50% 30%, hsla(190, 95%, 50%, 0.18), transparent 65%), radial-gradient(700px 500px at 50% 100%, hsla(160, 84%, 45%, 0.10), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(hsla(190,90%,55%,0.6) 1px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
          Ready when you are
        </span>
        <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-6 leading-[1.0] tracking-tight max-w-4xl mx-auto">
          Push a container.
          <br />
          <span className="text-muted-foreground">
            Get a confidential application.
          </span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Most apps you'd build today don't need to leak by default. Stop
          asking your customers to trust your operator.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/get-started">
            <Button
              size="lg"
              className="h-14 px-8 rounded-none text-base bg-primary text-background hover:bg-primary/90 transition-all font-mono"
            >
              Deploy your first app <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <a href="https://docs.enclava.dev">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-none text-base border-white/15 text-white hover:bg-white/5 font-mono"
            >
              Read the docs
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Products />
        <Services />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
