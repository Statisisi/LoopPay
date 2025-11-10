# LoopPay

Automated recurring invoices and pull-based payments on **Base** (Mainnet & Sepolia), built with upgradeable smart contracts and GitHub Actions–only delivery.

## What is LoopPay?

LoopPay lets a merchant create on-chain invoices and collect payments on a recurring schedule. The logic is modular and upgradeable (UUPS proxy), so behavior can evolve without changing the proxy address your users integrate with.

**Key goals**
- Clean, verifiable on-chain footprint on Base.
- Fully reproducible CI/CD via GitHub Actions (no local steps).
- Progressive upgrades: from minimal invoices to limits, roles, and integrations with Base tooling.

## Features (current & planned)

- Upgradeable contracts (UUPS) with strict access control.
- Invoice primitives: payer/payee, amount, token, interval, due date, active flag.
- Events for indexing activity (creation, payment, toggles).
- GitHub Actions workflows for deploy, verify, and release.
- Roadmap: daily/period limits, pausable flows, role-based controls, UI with OnchainKit, optional Coinbase Commerce payment route.

## Architecture

- **Proxy pattern:** UUPS proxy on Base. Implementation contracts are versioned (CoreV1, CoreV2, …).
- **Storage layout:** mappings and structs to track invoices and state.
- **Events-first design:** everything important emits a canonical event.
- **Security posture:** least privilege, pausability, non-reentrancy (as features graduate).

## Networks & deployments

This repository targets **Base Mainnet** and **Base Sepolia**. Canonical addresses and tx links live in:

- `deployments/deploy-info.md` (human-readable manifest kept in the repo).

> If you prefer machine-readable manifests later, mirror the same data into `deployments/8453.json` and `deployments/84532.json` (same schema: `proxy`, `implementation`, `txHash`, `timestamp`).

## GitHub Actions (CI/CD)

LoopPay is operated **100% through GitHub Actions**. Typical flows:

- **Deploy proxy (initial):** runs against Base Sepolia and/or Base Mainnet, writes results to `deployments/*`, and posts build artifacts to the run summary.
- **Verify implementation:** verifies the latest implementation on BaseScan.
- **Release tags:** pre-release for initial proxy deployment, regular releases for logic upgrades.

> Triggers are set up using workflow_dispatch inputs. Use the “Run workflow” UI in GitHub to choose the network and action.

### Required repository secrets

Create the following secrets in **Settings → Secrets and variables → Actions**:

- `PRIVATE_KEY` – deployer EOA (no quotes, 0x-prefixed hex). Use a key dedicated to CI.
- `BASESCAN_API_KEY` – API key for https://basescan.org.
- Optional for UI/hosting (later): `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

No local `.env` is required for day-to-day operation—only GitHub Actions secrets.

## Development model

- **No local runs.** All deploys and verifications happen in Actions.
- **Full-file edits only.** When updating code/docs, replace whole files via GitHub UI PRs.
- **No comments inside Solidity/TS files.** Keep code self-explanatory with names and structure.

## Repository layout

```
contracts/          core upgradeable logic
deployments/        chain manifests (addresses, txs)
scripts/            task runners used by Actions
tasks/              Hardhat tasks (if present)
.github/workflows/  CI/CD (deploy, verify, release, UI)
```

## Security

- Use a dedicated deployer key with minimal permissions.
- Verify each implementation on BaseScan and link the proxy.
- Respect storage layout rules on each upgrade (no slot collisions).
- Consider time-locked upgrade roles for production.

If you discover a vulnerability, please open a security disclosure (see `SECURITY.md` if present) or contact the maintainer privately.

## License

Licensed under **MIT**. See `LICENSE` for details.

## Status

repository hygiene + initial proxy deployment + pre-release. Upcoming steps will introduce CoreV1 logic, Sepolia upgrade, UI preview via OnchainKit, and a mainnet upgrade with limits/roles.
