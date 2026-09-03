import { motion } from "framer-motion";

const STATS = [
  { value: "0", label: "plaintext bytes visible to the operator" },
  { value: "< 60s", label: "from push to attested, running enclave" },
  { value: "100%", label: "of memory encrypted in use — hardware-enforced" },
];

export default function StatsQuote() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 md:mb-24"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="text-center py-11 px-5 rounded-[20px] border border-white/[0.07] bg-card/40"
            >
              <b className="block font-display text-4xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                {s.value}
              </b>
              <span className="block mt-2 text-sm md:text-[15px] text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="font-display text-[26px] md:text-[40px] font-semibold leading-[1.3] tracking-tight text-white">
            "We deploy our internal AI copilot here.{" "}
            <em className="not-italic text-primary">Legal stopped asking questions.</em>"
          </p>
          <footer className="mt-7 flex items-center justify-center gap-3.5">
            <span className="w-11 h-11 rounded-full grid place-items-center font-mono text-[13px] border border-primary/40 bg-gradient-to-br from-primary/50 to-secondary/40">
              AN
            </span>
            <span className="text-left text-sm">
              <b className="block">Security Lead</b>
              <span className="text-muted-foreground/70">
                Series B AI company, early access
              </span>
            </span>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
