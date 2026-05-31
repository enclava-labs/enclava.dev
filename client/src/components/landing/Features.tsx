import { motion } from "framer-motion";

const steps = [
  {
    idx: "01",
    title: "Describe your app",
    body: "One declarative file: image, resources, domains, persistent volumes. Same mental model you already have for Docker Compose or any modern PaaS.",
    code: (
      <>
        <span className="text-muted-foreground"># enclava.toml</span>
        {"\n"}name = "myapp"
        {"\n"}image = <span className="text-primary">"ghcr.io/me/app:latest"</span>
        {"\n"}resources = {"{"} cpu = 4, memory = <span className="text-primary">"8Gi"</span> {"}"}
        {"\n"}volumes.data = <span className="text-primary">"/var/lib/app"</span>
        {"\n"}domain = <span className="text-primary">"app.acme.com"</span>
      </>
    ),
  },
  {
    idx: "02",
    title: "We verify & provision",
    body: "The platform pulls your image, verifies its signature, generates the orchestration to run it inside a TEE on AMD SEV-SNP or Intel TDX, and provisions encrypted storage with keys only the TEE holds.",
    code: (
      <>
        <span className="text-muted-foreground">→ resolving digest…              </span><span className="text-secondary">ok</span>
        {"\n"}<span className="text-muted-foreground">→ verifying signature…           </span><span className="text-secondary">ok</span>
        {"\n"}<span className="text-muted-foreground">→ generating manifests…          </span><span className="text-secondary">ok</span>
        {"\n"}<span className="text-muted-foreground">→ provisioning encrypted volume </span><span className="text-secondary">ok</span>
        {"\n"}<span className="text-muted-foreground">→ allocating TEE (SEV-SNP)…     </span><span className="text-secondary">ok</span>
      </>
    ),
    pills: ["signed image", "encrypted volume", "isolated network"],
  },
  {
    idx: "03",
    title: "Your app boots inside a TEE",
    body: "The container runs in a hardware-isolated trusted execution environment where memory is encrypted at runtime. Even with full root on the host, the cloud operator cannot read your process memory, your filesystem, or your traffic.",
    code: (
      <>
        <span className="text-primary">▸</span> TEE attested
        {"\n"}<span className="text-primary">▸</span> volumes unlocked
        {"\n"}<span className="text-primary">▸</span> tls terminated <span className="text-muted-foreground">inside</span> TEE
        {"\n"}<span className="text-primary">▸</span> https://myapp.enclava.dev  <span className="text-secondary">live</span>
      </>
    ),
  },
  {
    idx: "04",
    title: "Deliver secrets directly into the TEE",
    body: "API keys, DB credentials, signing keys — encrypted on your laptop, opened only inside the running TEE. They never touch our control plane in plaintext.",
    code: (
      <>
        <span className="text-primary">$</span> enclava config set myapp \
        {"\n"}    OPENAI_KEY=sk-… \
        {"\n"}    DB_URL=postgres://…
        {"\n"}
        {"\n"}<span className="text-muted-foreground">→ wrapped to TEE key…       </span><span className="text-secondary">ok</span>
        {"\n"}<span className="text-muted-foreground">→ delivered                  </span><span className="text-secondary">✓</span>
      </>
    ),
  },
];

export default function Features() {
  return (
    <section
      id="how-it-works"
      className="py-32 relative overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(hsla(190,90%,55%,0.6) 1px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px circle at 15% 20%, hsla(190, 90%, 45%, 0.10), transparent 60%), radial-gradient(700px circle at 90% 75%, hsla(160, 84%, 45%, 0.08), transparent 65%)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
            How it works
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 leading-[1.0] tracking-tight">
            From <span className="font-mono text-primary text-[0.85em]">docker push</span>
            <br />
            <span className="text-muted-foreground">to confidential, in four steps.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            You give us a container. We give you a confidential application —
            running inside a hardware TEE (AMD SEV-SNP / Intel TDX), reachable
            on a TLS endpoint, with cryptographic proof of what's inside. No
            infrastructure expertise required.
          </p>
        </div>

        {/* Steps — vertical timeline, no outer box */}
        <div className="relative">
          {/* Connector spine */}
          <div className="absolute left-[14px] lg:left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent"></div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative grid lg:grid-cols-[60px_1fr_1.1fr] gap-6 lg:gap-12 pl-12 lg:pl-16 pr-2 lg:pr-4 py-6"
              >
                {/* Node + index */}
                <div className="absolute left-0 top-7 flex items-center gap-3 lg:contents">
                  <span className="lg:absolute lg:left-[18px] lg:top-1 w-4 h-4 rounded-full bg-background border border-primary/60 shadow-[0_0_18px_hsla(190,90%,45%,0.45)] grid place-items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  </span>
                </div>
                <div className="hidden lg:block font-mono text-xs text-primary/90 tracking-[0.25em] pt-1">
                  {step.idx}
                </div>
                <div>
                  <span className="lg:hidden font-mono text-[10px] text-primary/90 tracking-[0.25em] block mb-2">
                    {step.idx}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed max-w-md">
                    {step.body}
                  </p>
                  {step.pills && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {step.pills.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 border border-white/10 rounded-full font-mono text-[10px] text-muted-foreground bg-white/[0.02]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-card/60 backdrop-blur-sm border border-white/[0.06] p-5 font-mono text-[12.5px] leading-[1.7] text-white whitespace-pre-wrap rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  {step.code}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
