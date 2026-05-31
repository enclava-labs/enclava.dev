import { Link } from "wouter";
import { Button } from "@/components/ui/button";
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.01c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-display font-bold tracking-tighter text-white hover:opacity-80 transition-opacity"
        >
          ENCLAVA<span className="text-primary">.</span>DEV
        </Link>

        <div className="hidden md:flex items-center space-x-9">
          <Link
            href="/platform"
            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
          >
            Platform
          </Link>
          <Link
            href="/use-cases"
            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
          >
            Use cases
          </Link>
          <a
            href="/#how-it-works"
            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
          >
            How it works
          </a>
          <a
            href="/blog"
            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
          >
            Blog
          </a>
          <a
            href="https://docs.enclava.dev"
            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
          >
            Docs
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/enclava-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <Link href="/get-started">
            <Button
              size="sm"
              className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300 rounded-none px-5"
            >
              Deploy now →
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
