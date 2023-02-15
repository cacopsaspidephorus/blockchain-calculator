require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasReporter: {
    enabled: true
  },
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_TEST_URL,
      accounts: [process.env.PRIVATE_KEY_TEST]
    },
    bsc_test: {
      url: process.env.BSC_TEST_URL,
      accounts: [process.env.PRIVATE_KEY_TEST]
    }
  }
};
