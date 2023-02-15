import { ethers } from 'ethers';
import Calculator from './artifacts/contracts/Calculator.sol/Calculator.json';

//Operator
const Operator = {
    Addition: '+',
    Subtraction: '-',
    Multiplication: '*',
    Division: '/'
}

const numToOperator = (num) => {
    switch (num) {
        case 0:
            return '+';
        case 1:
            return '-';
        case 2:
            return '*';
        case 3:
            return '/';
        default:
            return '?'
    }
}

//Contract

let calculatorContract;
const calculatorContractAddr = "0x4BD8CFb84cB7207a2C2171EB0B50103B1f532BEe";

const requestAccount = async () => {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.log(error);
    }
}

const initCalculatorContract = async () => {
    if (typeof window.ethereum === 'undefined')
        return;

    await requestAccount();

    const provoder = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provoder.getSigner();

    return new ethers.Contract(calculatorContractAddr, Calculator.abi, signer);
}

const getCalculatorContract = async () => {
    if (typeof calculatorContract === "undefined")
        calculatorContract = await initCalculatorContract();

    return calculatorContract;
}

const operatorUtils = {
    Operator,
    numToOperator
}

const contractUtils = {
    getCalculatorContract
}

export {operatorUtils, contractUtils}