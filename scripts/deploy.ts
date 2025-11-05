import hre, { ethers, upgrades } from "hardhat";

async function main() {
  await hre.run("compile");

  const NAME = process.env.CONTRACT_NAME || "LoopPay";
  const FQN = process.env.CONTRACT_FQN || "contracts/LoopPay.sol:LoopPay";

  const [deployer] = await ethers.getSigners();
  const owner = process.env.OWNER || deployer.address;

  console.log("Deployer:", deployer.address);
  console.log("Owner for initialize:", owner);
  console.log("Contract:", NAME, "(FQN:", FQN + ")");

  let Factory;
  try {
    Factory = await ethers.getContractFactory(FQN);
  } catch {
    Factory = await ethers.getContractFactory(NAME);
  }

  const proxy = await upgrades.deployProxy(Factory, [owner], {
    kind: "uups",
    initializer: "initialize"
  });

  const tx = proxy.deploymentTransaction();
  if (tx) await tx.wait(3);

  const proxyAddress = await proxy.getAddress();
  console.log("Proxy:", proxyAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
