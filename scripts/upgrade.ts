import { ethers, upgrades } from "hardhat";

// Provide PROXY_ADDRESS via env or inline below
const PROXY_ADDRESS = process.env.PROXY_ADDRESS || "";

async function main() {
  if (!PROXY_ADDRESS) {
    throw new Error("Set PROXY_ADDRESS in env to the deployed proxy address");
  }

  console.log("Upgrading proxy:", PROXY_ADDRESS);

  const LoopPayV2 = await ethers.getContractFactory("LoopPayV2");
  const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, LoopPayV2);
  await upgraded.waitForDeployment();

  const proxyAddress = await upgraded.getAddress();
  const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log("Upgraded proxy:", proxyAddress);
  console.log("New implementation:", implAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
