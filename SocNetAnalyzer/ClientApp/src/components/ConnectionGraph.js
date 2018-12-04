import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';

export default class ConnectionGraph extends Component {

    config = {
        d3: {
            gravity: -10,
        },
        nodeHighlightBehavior: true,
        node: {
            color: 'lightgreen',
            size: 80,
            highlightStrokeColor: 'blue',
            renderLabel: false,
        },
        link: {
            highlightColor: 'lightblue'
        },
        height: 700,
        width: 800,
        // staticGraph: true
    };

    render() {
        const { datasetConnections } = this.props;

        if (datasetConnections.loaded) {
            return (
                <Graph
                    id='connection-graph'
                    data={datasetConnections}
                    config={this.config}
                    width={840} />
            );
        } else {
            return "Loading...";
        }

        
    }
}