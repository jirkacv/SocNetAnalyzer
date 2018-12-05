import { connect } from 'react-redux';

import GraphViewer from './../components/GraphViewer';

const mapStateToProps = (state, props) => {
    let datasetConnections = {
        nodes: [],
        edges: [],
        loaded: false,
        isError: false,
    };

    let id = props.dataset.id;
    const { connections } = state.datasets;

    if (connections.has(id)) {
        let connection = connections.get(id);
        if (connection.isError === true) {
            datasetConnections.isError = true;
        } else {

            datasetConnections.nodes = connection.ids.map(id => ({ id: id, label: id.toString() }));
            datasetConnections.edges = connection.links.map(l => ({ from: l.item1, to: l.item2 }));
            datasetConnections.loaded = true;
        }
    }

    return {
        datasetConnections,
    }
};


export default connect(mapStateToProps, null)(GraphViewer)