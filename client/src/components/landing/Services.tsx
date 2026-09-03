import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const TRUSTED = [
  "Your application",
  "Encrypted volumes & secrets",
  "TEE — AMD SEV-SNP",
];

const UNTRUSTED = ["Host OS / hypervisor", "Cloud operator (us)"];

export default function Services() {
  return (
    <section id="trust" className="py-24 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] p-10 md:p-[70px] grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center"
          style={{
            background:
              "radial-gradient(800px 400px at 20% 0%, hsla(190, 90%, 50%, 0.08), transparent 65%), radial-gradient(700px 400px at 90% 100%, hsla(160, 84%, 45%, 0.07), transparent 65%), hsl(223, 32%, 10%)",
          }}
        >
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary mb-4">
              <span className="w-[22px] h-px bg-primary/60" />
              Trust model
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-[1.06] tracking-tight">
              You don't have
              <br />
              <span className="text-muted-foreground/70">to trust us.</span>
            </h2>
            <p className="mt-4 md:mt-5 text-[15px] md:text-base text-muted-foreground leading-[1.7]">
              Every confidential application emits an attestation — a signed
              statement from the hardware. The platform operator is outside
              the trust boundary. Verify first, then send data.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {TRUSTED.map((label) => (
              <div
                key={label}
                className="flex items-center gap-3.5 px-5 py-4 rounded-xl font-mono text-[13px] text-white border border-primary/40 bg-background/60 shadow-[inset_0_0_30px_hsla(190,90%,45%,0.06)]"
              >
                <span className="w-[26px] h-[26px] rounded-lg grid place-items-center bg-primary text-primary-foreground flex-none">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                {label}
                <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-primary">
                  trusted
                </span>
              </div>
            ))}
            {UNTRUSTED.map((label) => (
              <div
                key={label}
                className="flex items-center gap-3.5 px-5 py-4 rounded-xl font-mono text-[13px] text-white/70 border border-white/[0.06] bg-background/40 opacity-55"
              >
                <span className="w-[26px] h-[26px] rounded-lg grid place-items-center bg-muted text-muted-foreground flex-none">
                  <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
                {label}
                <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
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
