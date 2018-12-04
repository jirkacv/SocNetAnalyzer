import { connect } from 'react-redux';

import StatsViewer from './../components/StatsViewer';

const mapStateToProps = (state, props) => {
    let datasetStats = [];

    let id = props.dataset.id;
    const { stats } = state.datasets;

    if (stats.has(id)) {
        let s = stats.get(id);

        datasetStats.push({ name: "Sample size", value: s.sampleSize });
        datasetStats.push({ name: "Unique users", value: s.uniqueUsers });
        datasetStats.push({ name: "Average friend count", value: Number(s.averageFriendCount).toFixed(2) });
    }

    return {
        datasetStats,
    }
};


export default connect(mapStateToProps, null)(StatsViewer)