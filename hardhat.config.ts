import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import * as dotenv from 'dotenv'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    immutableZkevmTestnet: {
      url: process.env.RPC_URL || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "immutableZkevmTestnet",
        chainId: 13473,
        urls: {
          apiURL: "https://immutable-testnet.blockscout.com/api",
          browserURL: "https://immutable-testnet.blockscout.com/",
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
}

export default config
