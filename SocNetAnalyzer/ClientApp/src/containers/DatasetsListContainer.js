import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DatasetList from '../components/DatasetList';
import { loadDatasets, importDataset, deleteDataset, loadDatasetStats } from '../actions/datasetActions';


const mapStateToProps = state => {
    return {
        datasets: state.datasets.items,
    }
};

const mapDispatchToActions = dispatch => (
    bindActionCreators({ loadDatasets, importDataset, deleteDataset, loadDatasetStats }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToActions)(DatasetList)