export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/10 py-14">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-2xl font-display font-bold text-white mb-4">
              ENCLAVA<span className="text-primary">.</span>
            </h4>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              The confidential applications platform. Push a container, get a
              confidential application — encrypted in use, verifiable by
              anyone, invisible to the cloud.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4">Platform</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/platform"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="/use-cases"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Use cases
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="/get-started"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Deploy your first app
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4">Resources</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://docs.enclava.dev"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/enclava-labs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Enclava. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
