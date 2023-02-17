import React from 'react';
import { operatorUtils, contractUtils } from '../utils';

import './History.css';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: []
        };

        this.getOperations = this.getOperations.bind(this);
    }

    async getOperations() {
        const contract = await contractUtils.getCalculatorContract();
        const eventFilter = contract.filters.Calculation();
        const events = await contract.queryFilter(eventFilter);

        this.setState({ operations: events.map(event => event.args) });
    }

    async componentDidMount() {
        await this.getOperations();

        const contract = await contractUtils.getCalculatorContract();

        contract.on("Calculation", async () => {
            await this.getOperations();
        })
    }

    render() {
        const content = (this.state.operations.length === 0) ?
            <p id='no-data'>no data</p> :
            <table>
                <thead>
                    <tr>
                        <th className='table-header'>A</th>
                        <th className='table-header'>Operator</th>
                        <th className='table-header'>B</th>
                        <th className='table-header'>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.operations.map(operation => {
                            return (
                                <tr key={Number(operation.timestamp)} style={operation.success ? { color: "green" } : { color: "red" }}>
                                    <td>{Number(operation.a)}</td>
                                    <td>{operatorUtils.numToOperator(operation.operator)}</td>
                                    <td>{Number(operation.b)}</td>
                                    <td>{Number(operation.result)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        return (
            <div>
                <p>Operations History</p>
                {content}
            </div>
        )
    }
}

export default History;