import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL || "";
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

// Use an empty accounts array if no private key provided to avoid accidental use
const accounts = PRIVATE_KEY ? [ "0x" + PRIVATE_KEY.replace(/^0x/, "") ] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  networks: {
    base: {
      chainId: 8453,
      url: BASE_MAINNET_RPC_URL,
      accounts
    },
    "base-sepolia": {
      chainId: 84532,
      url: BASE_SEPOLIA_RPC_URL,
      accounts
    }
  },
  etherscan: {
    apiKey: {
      base: ETHERSCAN_API_KEY,
      "base-sepolia": ETHERSCAN_API_KEY
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  }
};

export default config;
