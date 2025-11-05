import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const owner = process.env.OWNER || deployer.address;

  console.log("Deployer:", deployer.address);
  console.log("Owner for initialize:", owner);

  const LoopPay = await ethers.getContractFactory("LoopPay");
  const proxy = await upgrades.deployProxy(LoopPay, [owner], {
    kind: "uups",
    initializer: "initialize"
  });
  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log("LoopPay proxy:", proxyAddress);
  console.log("LoopPay implementation:", implAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
