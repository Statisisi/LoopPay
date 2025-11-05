import { task } from "hardhat/config";
import { upgrades } from "hardhat";

task("impl", "Prints implementation address for a proxy")
  .addParam("proxy", "Proxy address")
  .setAction(async ({ proxy }, hre) => {
    const impl = await upgrades.erc1967.getImplementationAddress(proxy);
    console.log("Implementation:", impl);
  });
