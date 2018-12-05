import React, { Component } from 'react';
import Graph from 'react-graph-vis';

export default class ConnectionGraph extends Component {

    config = {
        layout: {
            hierarchical: false,
            improvedLayout: false,
        },
        edges: {
            arrows: {
                to: false,
                from: false,
            },
            color: {
                color: 'lightblue'
            },
        },
        nodes: {
            color: '#3B5998',
            font: {
                color: 'white',
            }
        },
        interaction: {
            dragNodes: false,
        },
        physics: {
            enabled: true,
            solver: 'barnesHut',
            barnesHut: {
                avoidOVerlap: 1,
                damping: 1
            },
            stabilization: {
                enabled: true,
                iterations: 100,
                onlyDynamicEdges: false,
                fit: true
            },
        },
    };


    render() {
        const { datasetConnections } = this.props;

        if (datasetConnections.loaded) {
            this.config.physics.enabled = datasetConnections.edges.length < 1000;

            return (
                <Graph
                    id='connection-graph'
                    graph={datasetConnections}
                    options={this.config}
                    style={{ height: 700, width: 795 }}
                />
            );
        } else {
            let message = 'Loading...'
            if (datasetConnections.isError) {
                message = 'There was an error while loading graph data';
            }
            
            return <div style={{ padding: '1rem' }}>{message}</div>;
        }


    }
}