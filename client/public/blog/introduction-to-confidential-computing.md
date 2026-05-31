---
title: "Introduction to Confidential Computing: Protecting Data in Use"
date: 2025-01-06
description: "Confidential computing protects data while it is being processed, using hardware-based trusted execution environments. A primer on what it is, how it works, and the workloads it unlocks."
author: "Enclava Team"
tags:
  - confidential-computing
  - security
  - trusted-execution-environments
---

For two decades, "encrypt your data" has meant two things: encryption at rest, and encryption in transit. The third state — data *in use*, while it is being processed in memory — has been the gap. The CPU sees plaintext, the OS sees plaintext, the hypervisor sees plaintext, and so does anyone with enough access to those layers. Confidential computing closes that gap.

## What is confidential computing?

Confidential computing protects data while it is being processed. It does this with hardware-based **Trusted Execution Environments (TEEs)** — regions of a CPU where memory is encrypted at runtime, isolated from the rest of the system. Code running inside a TEE is invisible to:

- Privileged software on the host (the kernel, the hypervisor, other VMs)
- Cloud operators with physical access to the machine
- Anyone with administrative access who is not already inside the TEE itself

The hardware that makes this possible has matured significantly over the past few years. The two technologies most relevant to running production workloads today are:

- **AMD SEV-SNP (Secure Encrypted Virtualization — Secure Nested Paging).** Encrypts the memory of an entire virtual machine, with integrity protection against the hypervisor.
- **Intel TDX (Trust Domain Extensions).** Provides VM-level isolation with hardware-attested boot.

Older approaches — Intel SGX, ARM TrustZone — pioneered the field but had ergonomic and scalability tradeoffs that made them awkward to use for general-purpose workloads. SEV-SNP and TDX run unmodified Linux VMs, which means you can lift existing containerized applications into a TEE without rewriting them.

## Attestation: trust without trust

A TEE on its own is just an isolation primitive. The piece that makes it cryptographically useful is **remote attestation**: the hardware produces a signed statement describing exactly which code is running. Any party — your customers, your auditors, your own security team — can verify that statement before sending sensitive data into the system.

This flips the trust model. You no longer have to trust the cloud operator, the host OS, or the orchestration layer. You trust the silicon, and you trust the attested code. Everything else is outside the trust boundary.

## The three states of data security

Confidential computing completes the security triad:

| State          | Protection                        | Technology                |
|----------------|-----------------------------------|---------------------------|
| Data at rest   | Encrypted storage                 | AES, disk encryption      |
| Data in transit| Encrypted communication           | TLS, VPN                  |
| Data in use    | Hardware-isolated computation     | TEEs — SEV-SNP, TDX       |

Each of these has its own threat model. Encryption at rest stops someone who steals a hard drive. Encryption in transit stops a network attacker. Confidential computing stops the operator of the machine the data is on. They are independent primitives, and any production system handling sensitive data needs all three.

## What you can build with it

Confidential computing is often framed as an "AI" or "ML" story, because that's where the most visible pressure for it has come from. But the underlying primitive — *compute on data that nobody else can see* — applies to a much wider set of workloads. A few categories worth knowing about:

### Regulated SaaS

Health, finance, legal, gov. Your customers want cryptographic proof that even your engineers cannot see their data. With confidential computing, you can give them an attestation instead of an SOC2 letter and a promise. They can verify it before sending you anything.

### Encrypted databases and stateful workloads

Postgres, Redis, Mongo, Kafka — anything that holds state on disk. Persistent volumes encrypted with keys only the TEE can derive mean ops doesn't need root in the data, rogue insiders can't snapshot the disk, and backups are sealed by default.

### Internal tools that touch PII

Admin dashboards, support consoles, BI tools. Run them where the people who need them can use them, but where no one — including a compromised employee laptop, including the cloud operator — can quietly export the entire customer table.

### Multi-party computation

Two or more organizations want joint analytics on each other's data without anyone handing over raw rows. Deploy the joint workload inside a TEE, share the attestation, and everyone verifies that the same code is running. Clean rooms, federated analytics, joint risk models — all in scope.

### Secret-bearing workers

Workers that hold long-lived credentials — signing keys, payment-processor secrets, webhook HMACs, third-party API tokens. Inside a TEE, those secrets exist only at runtime, sealed at rest, and unreadable to the platform operator.

### Self-hosting that actually means it

Run open-source tools — Mattermost, Vaultwarden, Plausible, n8n — where the cloud operator genuinely cannot see what you do. "Self-hosted" stops being a euphemism.

### Private AI workloads

This is the case most people arrive at confidential computing through, and it is real: run LLMs, RAG pipelines, fine-tuning jobs, or agents over private data without the prompts, training data, or model weights being readable by the host. It's one of many things you can do with a TEE — not the whole story.

## What confidential computing isn't

A few things confidential computing does not solve, in case the marketing has been overpromising at you:

- **It is not a substitute for application security.** A vulnerable app inside a TEE is still vulnerable; the TEE protects against the layers *below* the app, not against bugs in the app itself.
- **It is not a free lunch on performance.** Memory encryption costs cycles. For most workloads it is a single-digit percentage hit; for some it is more.
- **It does not eliminate side channels entirely.** Hardware vendors patch them as they are found, but a sufficiently motivated adversary with deep timing access can still attack at the margins. The threat model is "the cloud operator with normal cloud-operator access cannot read your data" — not "a nation-state in your data center can never touch you".

What it does give you, very specifically, is the ability to run a workload on someone else's hardware while keeping the data inside that workload invisible to that someone, and to prove cryptographically that the code processing the data is what you said it was. That is a building block, and it is enough to change how a lot of systems are designed.

## Where to go next

Enclava handles the underlying complexity — TEE provisioning on SEV-SNP and TDX hardware, attestation, encrypted storage, secret delivery, ingress — so you can ship containers into a confidential application without learning kernels and key-broker services.

If you'd like to try it, [deploy your first app](/get-started) or read the [documentation](https://docs.enclava.dev).

---

*This post is the first in a series on confidential computing. Future posts will go deeper on attestation, remote-attestation workflows for end users, and patterns for designing systems that lean on TEEs as a primitive rather than treating them as a checkbox.*
