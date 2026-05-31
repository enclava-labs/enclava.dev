import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const trusted = [
  "Your application",
  "Encrypted volumes & secrets",
  "TEE — AMD SEV-SNP / Intel TDX",
];
const untrusted = [
  "Host OS / hypervisor",
  "Cloud operator (us)",
  "Network path",
];

export default function Services() {
  return (
    <section
      id="trust"
      className="py-32 relative overflow-hidden"
    >
      {/* Atmosphere — shield-like radial bloom + subtle scanlines */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 700px at 50% 50%, hsla(190, 95%, 50%, 0.12), transparent 60%), radial-gradient(700px circle at 90% 20%, hsla(160, 84%, 45%, 0.08), transparent 65%)",
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background:
              "repeating-linear-gradient(180deg, hsla(190,90%,55%,0.5) 0px, hsla(190,90%,55%,0.5) 1px, transparent 1px, transparent 6px)",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 75%)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-card/50 backdrop-blur-md border border-white/[0.08] rounded-2xl p-10 md:p-14 grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          <div>
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
              Trust model
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6 leading-[1.05] tracking-tight">
              You don't have
              <br />
              <span className="text-muted-foreground">to trust us.</span>
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
              Every confidential application emits an{" "}
              <span className="text-white">attestation</span> — a signed
              statement from the hardware describing exactly which code is
              running. Anyone (your customers, your auditors, you) can verify
              it before sending data. The platform operator is outside the
              trust boundary.
            </p>
            <div className="flex flex-wrap gap-2">
              {["verifiable", "remote attestation", "open trust boundary"].map(
                (p) => (
                  <span
                    key={p}
                    className="px-3 py-1 border border-white/10 rounded-full font-mono text-[10px] text-muted-foreground bg-white/[0.02]"
                  >
                    {p}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Trust boundary divider */}
          <div className="relative hidden lg:flex flex-col items-center self-stretch">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
            </div>
            <div className="relative my-auto -rotate-90 whitespace-nowrap">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70 bg-card px-3 py-1 border border-white/10 rounded-full">
                trust boundary
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {trusted.map((label) => (
              <div
                key={label}
                className="flex items-center gap-4 px-5 py-4 bg-background/60 border border-primary/40 shadow-[inset_0_0_24px_hsla(190,90%,45%,0.10),0_0_22px_-12px_hsla(190,90%,45%,0.6)] font-mono text-[13px] rounded-md"
              >
                <span className="w-7 h-7 grid place-items-center bg-primary text-background rounded-sm">
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </span>
                <span className="text-white">{label}</span>
                <span className="ml-auto text-[10px] text-primary/80 uppercase tracking-wider">
                  trusted
                </span>
              </div>
            ))}
            {untrusted.map((label) => (
              <div
                key={label}
                className="flex items-center gap-4 px-5 py-4 bg-background/40 border border-white/[0.06] opacity-60 font-mono text-[13px] rounded-md"
              >
                <span className="w-7 h-7 grid place-items-center bg-muted/60 rounded-sm">
                  <X className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
                </span>
                <span className="text-white/70">{label}</span>
                <span className="ml-auto text-[10px] text-muted-foreground uppercase tracking-wider">
                  untrusted
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
