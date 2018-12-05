import { connect } from 'react-redux';

import StatsViewer from './../components/StatsViewer';

const mapStateToProps = (state, props) => {
    let datasetStats = {
        stats: [],
        isError: false,
    };

    let id = props.dataset.id;
    const { stats } = state.datasets;

    if (stats.has(id)) {
        let s = stats.get(id);

        if (s.isError === true) {
            datasetStats.isError = true;
        } else {
            datasetStats.stats.push({ name: "Sample size", value: s.sampleSize });
            datasetStats.stats.push({ name: "Unique users", value: s.uniqueUsers });
            datasetStats.stats.push({ name: "Average friend count", value: Number(s.averageFriendCount).toFixed(2) });    
        }
    }

    return {
        datasetStats,
    }
};


export default connect(mapStateToProps, null)(StatsViewer)