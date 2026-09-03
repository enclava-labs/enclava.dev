import { Link } from "wouter";
import SocialLinks from "@/components/landing/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-14 md:py-[70px] bg-[hsl(223,33%,7%)]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1 md:col-start-1">
            <Link
              href="/"
              className="text-2xl font-display font-extrabold tracking-tighter text-white"
            >
              ENCLAVA<span className="text-primary">.</span>DEV
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mt-4 text-sm">
              The confidential applications platform. Encrypted in use,
              verifiable by anyone, invisible to the cloud.
            </p>
            <p className="text-muted-foreground text-sm mt-3">
              A product of{" "}
              <a
                href="https://enclava-labs.com/"
                className="text-white hover:text-primary transition-colors"
              >
                Enclava Labs
              </a>
              .
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <div className="md:col-start-3">
            <h5 className="font-semibold text-white mb-4 text-[13px]">Platform</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="/platform" className="text-muted-foreground hover:text-primary transition-colors">Overview</Link></li>
              <li><Link href="/use-cases" className="text-muted-foreground hover:text-primary transition-colors">Use cases</Link></li>
              <li><a href="/#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it works</a></li>
              <li><Link href="/get-started" className="text-muted-foreground hover:text-primary transition-colors">Deploy your first app</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4 text-[13px]">Resources</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="https://docs.enclava.dev" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="https://github.com/enclava-labs/" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="https://enclava.ai" className="text-muted-foreground hover:text-primary transition-colors">Enclava.ai</a></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-7 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Enclava Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground/60">
              encrypted in use · AMD SEV-SNP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
