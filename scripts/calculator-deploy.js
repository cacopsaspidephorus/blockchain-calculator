const hre = require("hardhat");

const deployCalculator = async () => {
  console.log("Deploying Calculator...");

  const Calculator = await hre.ethers.getContractFactory("Calculator");
  const calculator = await Calculator.deploy();

  await calculator.deployed();

  console.log(`Calculator deployed to ${calculator.address}`);
}

async function main() {
  await deployCalculator();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
