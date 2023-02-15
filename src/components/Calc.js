import { isNull } from 'mathjs';
import React from 'react';
import { operatorUtils, contractUtils } from '../utils';

import './Calc.css';

class Calc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            errorMessage: "",
            success: true
        };

        this.calc = this.calc.bind(this);
    }

    /*
    Для простоты закладываюсь на то, что входная строка состоит из двух операндов
    в виде чисел и одного оператора
    */
    split(expression, operator) {
        const pieces = expression.split(operator);

        if (pieces.length !== 2)
            return null;

        const numA = Number(pieces[0]);
        const numB = Number(pieces[1]);

        if (isNaN(numA) || isNaN(numB))
            return null;

        return {
            operator: operator,
            numA: numA,
            numB: numB
        }
    }

    parseInput(calcStr) {
        calcStr = calcStr.replace(/\s/g, ""); //удаление пробелов

        let calcObj = this.split(calcStr, operatorUtils.Operator.Addition);

        if (isNull(calcObj))
            calcObj = this.split(calcStr, operatorUtils.Operator.Subtraction);

        if (isNull(calcObj))
            calcObj = this.split(calcStr, operatorUtils.Operator.Multiplication);

        if (isNull(calcObj))
            calcObj = this.split(calcStr, operatorUtils.Operator.Division);

        if (isNull(calcObj)) {
            this.setState({ errorMessage: "Incorrect input string" });
            return;
        } else
            this.setState({ errorMessage: "" });

        return calcObj;
    }

    async calc() {
        const calcStr = document.getElementById("calc-str").value;
        const calcObj = this.parseInput(calcStr);

        if (typeof calcObj === "undefined")
            return;

        const contract = await contractUtils.getCalculatorContract();

        let transaction;

        switch (calcObj.operator) {
            case operatorUtils.Operator.Addition:
                transaction = await contract.add(calcObj.numA, calcObj.numB);
                break;
            case operatorUtils.Operator.Subtraction:
                transaction = await contract.sub(calcObj.numA, calcObj.numB);
                break;
            case operatorUtils.Operator.Multiplication:
                transaction = await contract.mul(calcObj.numA, calcObj.numB);
                break;
            case operatorUtils.Operator.Division:
                transaction = await contract.div(calcObj.numA, calcObj.numB);
                break;
            default:
                this.setState({ errorMessage: `Incorrect operator ${calcObj.operator}` });
        }

        const transactionReceipt = await transaction.wait();
        const event = transactionReceipt.events.find(event => event.event === 'Calculation');

        this.setState({ result: String(event.args.result) });
        this.setState({ success: event.args.success });
    }

    render() {
        return (
            <div>
                <input id='calc-str' placeholder='5 + 5' />
                <button id='calc-btn' onClick={this.calc} title='Calc'>Calc</button>
                
                <p style={{ color: "red", fontSize: 14 }}>{this.state.errorMessage}</p>
                <p style={this.state.success ? { background: "green" } : { background: "red" }}>{this.state.result}</p>
            </div>
        );
    }
}

export default Calc;