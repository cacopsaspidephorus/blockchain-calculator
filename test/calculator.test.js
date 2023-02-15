const { expect } = require("chai");
const { ethers } = require("hardhat");

let calculator;

before("Before", function () {
  it("Deploy Calculator", async () => {
    const Calculator = await ethers.getContractFactory("Calculator");
    calculator = await Calculator.deploy();

    expect(calculator.address).to.be.properAddress;
  });
});

describe("Calculator", function () {
    it("Addition", async () => {
      const a = 10;
      const b = 7;

      const tx = await calculator.add(a, b);
      const eventArgs = await extractEventArgs(tx);

      expect(eventArgs.success).equals(true);
      expect(eventArgs.result).equals(a + b);
    });

    it("Subtraction", async () => {
      const a = 10;
      const b = 7;

      const tx = await calculator.sub(a, b);
      const eventArgs = await extractEventArgs(tx);

      expect(eventArgs.success).equals(true);
      expect(eventArgs.result).equals(a - b);
    });
    it("Subtraction (Fail)", async () => {
      const a = 7;
      const b = 10;

      const tx = await calculator.sub(a, b);
      const eventArgs = await extractEventArgs(tx);

      expect(eventArgs.success).equals(false);
      expect(eventArgs.result).equals(0);
    });
    it("Multiplication", async () => {
      const a = 10;
      const b = 7;

      const tx = await calculator.mul(a, b);
      const eventArgs = await extractEventArgs(tx);

      expect(eventArgs.success).equals(true);
      expect(eventArgs.result).equals(a * b);
    });
    it("Division", async () => {
      const a = 10;
      const b = 7;

      const tx = await calculator.div(a, b);
      const eventArgs = await extractEventArgs(tx);

      expect(eventArgs.success).equals(true);
      expect(eventArgs.result).equals(Math.trunc(a / b));
    });
    it("Division (Fail)", async () => {
      const a = 10;
      const b = 0;

      const tx = await calculator.div(a, b);
      const eventArgs = await extractEventArgs(tx);

      expect(eventArgs.success).equals(false);
      expect(eventArgs.result).equals(0);
    });
  });

  const extractEventArgs = async (tx) => {
    const rc = await tx.wait();
    const event = rc.events.find(event => event.event === 'Calculation');

    return event.args;
  }