# LoopPay — Deployment Info

## Base Mainnet
- **Proxy:** `0xA321Dc22175e47EFD3bdeB600212cEde6f56b1816`
- **Network:** Base Mainnet
- **Deployer:** `0x351984dA8d647811960C10133E090746fa461BD5`
- **Owner (initializer):** `0x351984dA8d647811960C10133E090746fa461BD5`
- **Contract (FQN):** `contracts/LoopPay.sol:LoopPay`
- **Status:** ✅ Active
- **Verified on:** [basescan.org/address/0xA321Dc22175e47EFD3bdeB600212cEde6f56b1816](https://basescan.org/address/0xA321Dc22175e47EFD3bdeB600212cEde6f56b1816)

---

## Base Testnet (Sepolia)
- **Proxy:** `0x8D316D1E06a07524549a7407150C1325e19Ba7eD`
- **Network:** Base Sepolia Testnet
- **Deployer:** `0x351984dA8d647811960C10133E090746fa461BD5`
- **Owner (initializer):** `0x351984dA8d647811960C10133E090746fa461BD5`
- **Contract (FQN):** `contracts/LoopPay.sol:LoopPay`
- **Status:** ✅ Active
- **Verified on:** [sepolia.basescan.org/address/0x8D316D1E06a07524549a7407150C1325e19Ba7eD](https://sepolia.basescan.org/address/0x8D316D1E06a07524549a7407150C1325e19Ba7eD)

---

## Notes
- Both deployments use **UUPS Proxy pattern**.
- Upgrades are handled through `scripts/upgrade.ts`.
- The same deployer and owner were used for both environments.
- Workflow used: `.github/workflows/deploy.yml`
