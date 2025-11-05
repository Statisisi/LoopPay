import hre, { ethers, upgrades } from "hardhat";

const PROXY_ADDRESS = process.env.PROXY_ADDRESS || "";

async function main() {
  if (!PROXY_ADDRESS) {
    throw new Error("Set PROXY_ADDRESS in env to the deployed proxy address");
  }

  await hre.run("compile");

  const NAME_V2 = process.env.CONTRACT_NAME_V2 || "LoopPayV2";
  const FQN_V2 = process.env.CONTRACT_FQN_V2 || "contracts/LoopPayV2.sol:LoopPayV2";

  console.log("Upgrading proxy:", PROXY_ADDRESS);
  console.log("New impl:", NAME_V2, "(FQN:", FQN_V2 + ")");

  let Impl;
  try {
    Impl = await ethers.getContractFactory(FQN_V2);
  } catch {
    Impl = await ethers.getContractFactory(NAME_V2);
  }

  const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, Impl);

  const tx = upgraded.deploymentTransaction();
  if (tx) await tx.wait(3);

  const proxyAddress = await upgraded.getAddress();
  console.log("Proxy:", proxyAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
