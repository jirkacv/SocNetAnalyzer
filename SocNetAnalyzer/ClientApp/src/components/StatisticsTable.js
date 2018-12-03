import React, { Component } from 'react';
import { Table } from 'reactstrap'

export default class StatisticsTable extends Component {

    renderRows = () => {
        const { datasetStats } = this.props;

        if (!datasetStats || (datasetStats && datasetStats.length === 0)) {
            return (
                <tr>
                    <td>There are no statistics to show</td>
                </tr>

            );
        }

        return datasetStats.map(d =>
            <tr className="d-flex" key={d.name}>
                <td className="col-8">{d.name}</td>
                <td className="col-4">{d.value}</td>
            </tr>)
    }

    render() {
        return (
            <Table size="sm" borderless>
                <thead>
                    <tr className="d-flex">
                        <th className="col-8">Statistic</th>
                        <th className="col-4">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </Table>

        );
    }
}