import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1120px,calc(100%-2rem))] flex items-center justify-between py-2.5 pr-2.5 pl-6 rounded-full border border-white/10 bg-background/70 backdrop-blur-xl shadow-[0_8px_32px_hsla(223,40%,4%,0.45)]">
      <Link
        href="/"
        className="text-lg font-display font-extrabold tracking-tighter text-white hover:opacity-85 transition-opacity"
      >
        ENCLAVA<span className="text-primary">.</span>DEV
      </Link>

      <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
        <Link href="/platform" className="hover:text-foreground transition-colors">
          Platform
        </Link>
        <Link href="/use-cases" className="hover:text-foreground transition-colors">
          Use cases
        </Link>
        <a href="/#how-it-works" className="hover:text-foreground transition-colors">
          How it works
        </a>
        <a href="/blog" className="hover:text-foreground transition-colors">
          Blog
        </a>
        <a
          href="https://docs.enclava.dev"
          className="hover:text-foreground transition-colors"
        >
          Docs
        </a>
      </div>

      <Link href="/get-started">
        <Button
          size="sm"
          className="rounded-full font-mono text-sm h-10 px-5 bg-primary text-primary-foreground border-none hover:bg-primary/90 hover:shadow-[0_0_28px_hsla(190,90%,50%,0.45)] transition-all"
        >
          Request access <ArrowRight className="!size-3.5" />
        </Button>
      </Link>
    </nav>
  );
}
