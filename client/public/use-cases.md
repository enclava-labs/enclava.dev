# Use Cases: Software That Can't Leak

> Enclava takes any container. Below are the workloads our users bring on day one — but the platform isn't opinionated about what runs on it. If it's a Linux container, it can run confidentially.

## Private AI, inference & agents

Run LLMs, embedding pipelines, RAG stacks, agentic workflows, and fine-tuning jobs without your prompts, training data, or model weights ever being readable by the host. Same OpenAI-compatible APIs your team already uses, with cryptographic guarantees underneath.

- Internal copilots over private knowledge
- Customer-facing AI where prompts are sensitive
- Inference on regulated data (health, finance, legal)
- Agents that hold long-lived API keys
- Fine-tuning on proprietary datasets

See also: [confidential AI agents](/products/agents.md), [confidential chatbots](/products/chatbots.md)

## Regulated SaaS

Health, finance, legal, gov. Customers want cryptographic proof that even your engineers can't see their data. The alternative is rebuilding your stack on-prem for every deal — which kills your margins and your roadmap.

- HIPAA, GDPR, SOC2 + cryptographic trust boundary
- Multi-tenant SaaS with per-tenant attestation
- Audit trails that prove what code processed the data
- Customers with data-residency hard requirements

## Encrypted databases & stateful workloads

Postgres, Redis, Mongo, Kafka — anything that holds state. Persistent volumes are encrypted with keys only the TEE can derive. Ops doesn't need root in your data; rogue insiders can't snapshot it; backups are sealed.

- Production databases with PII / PHI / PCI
- Long-running workers and queues
- Caches that hold session tokens
- Self-hosted vector DBs over private corpora

## Internal tools that handle PII

Admin dashboards, support consoles, BI tools. Run them where the people who need them can use them — but where no one (including the cloud operator, including a compromised employee laptop) can quietly export the database.

- Customer support consoles
- BI dashboards on raw user data
- Internal admin tools
- Data labeling / annotation platforms

## Secret-bearing workers

Workers that hold long-lived secrets: signing keys, payment processor credentials, webhook HMACs, third-party API tokens. The secrets live inside the TEE and are unsealed only at runtime; even the platform operator can't read them at rest.

- Code-signing pipelines
- Payment-processing workers
- Webhook senders/receivers
- Third-party integration glue

## Multi-party computation

Two (or more) companies want joint analytics on each other's data without either side handing over the raw rows. Deploy the joint workload here; everyone verifies the same attestation; nobody can read the inputs — including us.

- Data clean rooms
- Joint fraud / risk modeling
- Federated analytics across orgs
- Verifiable benchmarking between competitors

## Self-hosting, but actually private

Run open-source apps where the cloud operator can't see what you do. "Self-hosted" finally means it — without you having to operate Kubernetes, hardware, attestation, and key management yourself.

- Mattermost, Vaultwarden, Plausible, n8n
- Personal note-taking and journaling
- Private code forges and CI runners
- Confidential community infrastructure

## Next steps

- [Get started](/get-started.md)
- [How the platform works](/platform.md)
