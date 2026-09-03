import { motion } from "framer-motion";

const WORKLOADS = [
  "private LLM inference",
  "RAG pipelines",
  "regulated SaaS",
  "encrypted Postgres",
  "PII dashboards",
  "signing workers",
  "multi-party clean rooms",
  "self-hosted, actually private",
  "fine-tuning jobs",
  "federated analytics",
  "internal copilots",
  "agent workloads",
];

export default function LogoTicker() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="pt-6 pb-2 overflow-hidden"
    >
      <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/60 text-center mb-8">
        Workloads running on enclava today
      </div>

      <div
        className="relative overflow-hidden py-1.5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex gap-3.5 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...WORKLOADS, ...WORKLOADS].map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-[13px] text-muted-foreground px-5 py-3 rounded-2xl bg-card/60 border border-border hover:border-primary hover:text-foreground transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-[2px] bg-primary/80" />
              {w}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
