# Platform: The PaaS for Confidential Apps

> Enclava runs your containers inside trusted execution environments (TEEs) on AMD SEV-SNP. You bring an image — we handle attestation, encrypted storage, sealed secrets, TLS, domains, and the orchestration underneath.

The same workflow you have on a normal cloud, but the cloud can't see your data.

## The CLI & managed cloud (for developers)

Install `enclava`, point it at a container image, and your app is running in a hardware TEE with TLS, attested release, and encrypted volumes — in one command.

```
$ brew install enclava
$ enclava deploy myapp ghcr.io/me/app:latest
▸ live at https://myapp.enclava.dev
```

[Request access](/get-started.md)

## The deploy engine (for infrastructure providers)

The orchestration layer that makes confidential deploys work — manifest generation, attestation, encrypted storage, ingress — is open source. Run it on your own SEV-SNP hardware, brand it, resell it. Every confidential cloud needs this layer; you don't have to build it.

- **Bring your own hardware** — run on AMD SEV-SNP-capable clusters (Intel TDX planned)
- **White-label** — your brand, your control plane, our engine underneath
- **Open source** — audit it, fork it, contribute back: [github.com/enclava-labs/cap](https://github.com/enclava-labs/cap)

## Capabilities

- **Declarative deploys.** Describe your app in one file: image, resources, volumes, domain. Push from your laptop or your CI. Same workflow whether you're shipping a web app, a database, or an inference server.
- **Sealed secrets.** Secrets are encrypted on your machine and unsealed only inside the running TEE. They never sit in plaintext in our control plane, our database, or our logs.
- **Encrypted persistent volumes.** Stateful workloads — databases, caches, queues — keep their data on disk, encrypted with keys only the TEE can derive. Restart, scale, migrate; the data stays sealed.
- **Built-in TLS & domains.** Custom domains, ACME certificates, ingress — all handled. TLS terminates inside the TEE so your traffic is never decrypted on shared infrastructure.
- **Verifiable releases.** Every deploy emits a public attestation pinning the exact image running inside the TEE (AMD SEV-SNP). Customers, auditors, or you can verify it without trusting us.
- **Network isolation.** Pod-to-pod policies, internal-only services, egress controls. Workloads are isolated by default; you opt in to what crosses the boundary.

## Next steps

- [Deploy your first confidential app](/get-started.md)
- [Use cases](/use-cases.md)
- [Developer documentation](https://docs.enclava.dev)
