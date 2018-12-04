import { connect } from 'react-redux';

import GraphViewer from './../components/GraphViewer';

const mapStateToProps = (state, props) => {
    let datasetConnections = {
        nodes: [],
        links: [],
        loaded: false,
    };

    let id = props.dataset.id;
    const { connections } = state.datasets;

    if (connections.has(id)) {
        let connection = connections.get(id);
        datasetConnections.nodes = connection.ids.map(id =>  ({ id: id.toString() }));
        datasetConnections.links = connection.links.map(l => ({ source: l.item1.toString(), target: l.item2.toString() }));
        datasetConnections.loaded = true;

    }

    return {
        datasetConnections,
    }
};


export default connect(mapStateToProps, null)(GraphViewer)