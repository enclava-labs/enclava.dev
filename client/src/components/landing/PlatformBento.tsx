import { motion } from "framer-motion";
import { Lock, ShieldCheck, KeyRound, Database, Globe } from "lucide-react";

const BARS = [34, 52, 41, 66, 48, 78, 58, 92];

const ATTEST_ROWS = [
  { label: "measurement", value: "sha256:9f2a…c41d" },
  { label: "policy", value: "SEV-SNP · v1.55" },
  { label: "launch", value: "amd-signed" },
];

export default function PlatformBento() {
  return (
    <section id="platform" className="py-24 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-14 md:mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary mb-4">
            <span className="w-[22px] h-px bg-primary/60" />
            The platform
            <span className="w-[22px] h-px bg-primary/60" />
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[1.05] tracking-tight">
            Everything a cloud gives you.
            <br />
            <span className="text-muted-foreground/70">None of the trust.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Deploy with the ergonomics of a modern PaaS. Get hardware-grade
            confidentiality you can prove to your customers, your auditors,
            and yourself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Runtime — chart card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden lg:col-span-3 rounded-[20px] p-7 md:p-8 border border-white/[0.07] bg-gradient-to-b from-card-hi/50 to-card/50 hover:border-primary/45 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_hsla(190,90%,45%,0.35)] transition-all duration-300"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              01 · Runtime
            </span>
            <div className="absolute top-7 right-7 w-[42px] h-[42px] rounded-xl grid place-items-center bg-primary/10 border border-primary/25 text-primary">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mt-4 mb-2.5">
              Encrypted in use
            </h3>
            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              Your container runs inside a TEE where memory is encrypted at
              runtime. Even with full root on the host, the cloud operator
              cannot read your process memory, filesystem, or traffic.
            </p>
            <div className="flex items-end gap-1.5 h-[88px] mt-5">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-b from-primary/85 to-primary/20 origin-bottom transition-transform duration-500 group-hover:scale-y-105"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Attestation — vignette card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="group relative overflow-hidden lg:col-span-3 rounded-[20px] p-7 md:p-8 border border-white/[0.07] bg-gradient-to-b from-card-hi/50 to-card/50 hover:border-primary/45 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_hsla(190,90%,45%,0.35)] transition-all duration-300"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              02 · Proof
            </span>
            <div className="absolute top-7 right-7 w-[42px] h-[42px] rounded-xl grid place-items-center bg-secondary/10 border border-secondary/25 text-secondary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mt-4 mb-2.5">
              Remote attestation
            </h3>
            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              Every app emits a signed statement from the hardware describing
              exactly which code is running. Anyone can verify it before
              sending data.
            </p>
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-[hsl(223,32%,8%)] font-mono text-xs py-4 px-[18px]">
              {ATTEST_ROWS.map((r) => (
                <div key={r.label} className="flex items-center gap-2.5 py-0.5 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_hsl(160,84%,39%)]" />
                  {r.label}
                  <span className="ml-auto text-[11px] text-muted-foreground/60">{r.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Small cards */}
          {[
            {
              tag: "03 · Secrets",
              icon: KeyRound,
              title: "Direct-to-enclave",
              body: "API keys, DB URLs, signing keys — encrypted on your laptop, opened only inside the running TEE. Never plaintext in our control plane.",
            },
            {
              tag: "04 · Storage",
              icon: Database,
              title: "Encrypted volumes",
              body: "Persistent storage with keys held only by the TEE. Ops never needs root in your data.",
            },
            {
              tag: "05 · Network",
              icon: Globe,
              title: "TLS inside the enclave",
              body: "Traffic terminates inside the TEE. The network path is untrusted — and that's fine.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden lg:col-span-2 rounded-[20px] p-7 md:p-8 border border-white/[0.07] bg-gradient-to-b from-card-hi/50 to-card/50 hover:border-primary/45 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_hsla(190,90%,45%,0.35)] transition-all duration-300"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                {c.tag}
              </span>
              <div className="w-[42px] h-[42px] rounded-xl grid place-items-center bg-primary/10 border border-primary/25 text-primary mt-4 mb-1">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mt-3 mb-2.5">
                {c.title}
              </h3>
              <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
