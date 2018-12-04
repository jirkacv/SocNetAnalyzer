import {
    CREATE_DATASET_START,
    CREATE_DATASET_SUCCESS,
    CREATE_DATASET_ERROR,
    CREATE_DATASET_COMPLETE,

    IMPORT_DATASET_START,
    IMPORT_DATASET_SUCCESS,
    IMPORT_DATASET_ERROR,
    IMPORT_DATASET_COMPLETE,

    LOAD_DATASETS_START,
    LOAD_DATASETS_SUCCESS,
    LOAD_DATASETS_ERROR,
    LOAD_DATASETS_COMPLETE,

    LOAD_DATASET_STATS_START,
    LOAD_DATASET_STATS_SUCCESS,
    LOAD_DATASET_STATS_ERROR,
    LOAD_DATASET_STATS_COMPLETE,
    
    LOAD_DATASET_CONNECTIONS_START,
    LOAD_DATASET_CONNECTIONS_SUCCESS,
    LOAD_DATASET_CONNECTIONS_ERROR,
    LOAD_DATASET_CONNECTIONS_COMPLETE,

    DELETE_DATASET_START,
    DELETE_DATASET_SUCCESS,
    DELETE_DATASET_ERROR,
    DELETE_DATASET_COMPLETE,
} from './actionTypes';
import { getDatasetsUrl } from '../constants/url';
import axios from 'axios';

const createDatasetStart = () => ({
    type: CREATE_DATASET_START
});

const createDatasetSuccess = dataset => ({
    type: CREATE_DATASET_SUCCESS,
    dataset,
});

const createDatasetError = error => ({
    type: CREATE_DATASET_ERROR,
    error,
});

const createDatasetComplete = () => ({
    type: CREATE_DATASET_COMPLETE
});


const importDatasetStart = () => ({
    type: IMPORT_DATASET_START
});

const importDatasetSuccess = datasetId => ({
    type: IMPORT_DATASET_SUCCESS,
    datasetId,
});

const importDatasetError = error => ({
    type: IMPORT_DATASET_ERROR,
    error,
});

const importDatasetComplete = () => ({
    type: IMPORT_DATASET_COMPLETE
});

export const importDataset = (name, file) => dispatch => {
    let dataset = null;
    let createFailed = false;

    dispatch(createDatasetStart());

    axios.post(getDatasetsUrl('create'), { name })
        .then(resp => {
            dataset = resp.data;
            dispatch(createDatasetSuccess(resp.data));
        })
        .catch(err => {
            createFailed = true;
            dispatch(createDatasetError(err));
        })
        .then(() => dispatch(createDatasetComplete()))
        .then(() => {
            if (!createFailed) {
                dispatch(importDatasetStart());
                let formData = new FormData();
                formData.append("datasetId", dataset.id);
                formData.append("formFile", file);

                axios.post(getDatasetsUrl('import'), formData)
                    .then(resp => dispatch(importDatasetSuccess(dataset.id)))
                    .catch(err => dispatch(importDatasetError(err)))
                    .then(() => dispatch(importDatasetComplete()));
            }
        })
        ;
};


const deleteDatasetStart = datasetId => ({
    type: DELETE_DATASET_START,
    datasetId
});

const deleteDatasetSuccess = datasetId => ({
    type: DELETE_DATASET_SUCCESS,
    datasetId
});

const deleteDatasetError = error => ({
    type: DELETE_DATASET_ERROR,
    error,
});

const deleteDatasetComplete = () => ({
    type: DELETE_DATASET_COMPLETE
});

export const deleteDataset = datasetId => dispatch => {
    dispatch(deleteDatasetStart(datasetId));

    axios.delete(getDatasetsUrl(`delete?datasetId=${datasetId}`))
        .then(resp => dispatch(deleteDatasetSuccess(datasetId)))
        .catch(err => dispatch(deleteDatasetError(err)))
        .then(() => dispatch(deleteDatasetComplete()));
}

const loadDatasetsStart = () => ({
    type: LOAD_DATASETS_START
});

const loadDatasetsSuccess = datasets => ({
    type: LOAD_DATASETS_SUCCESS,
    datasets,
});

const loadDatasetsError = error => ({
    type: LOAD_DATASETS_ERROR,
    error,
});

const loadDatasetsComplete = () => ({
    type: LOAD_DATASETS_COMPLETE
});

export const loadDatasets = () => dispatch => {
    dispatch(loadDatasetsStart());

    axios.get(getDatasetsUrl('list'))
        .then(resp => dispatch(loadDatasetsSuccess(resp.data)))
        .catch(err => dispatch(loadDatasetsError(err)))
        .then(() => dispatch(loadDatasetsComplete()));
};

const loadDatasetStatsStart = () => ({
    type: LOAD_DATASET_STATS_START
});

const loadDatasetStatsSuccess = (datasetId, datasetStats) => ({
    type: LOAD_DATASET_STATS_SUCCESS,
    datasetStats,
    datasetId,
});

const loadDatasetStatsError = error => ({
    type: LOAD_DATASET_STATS_ERROR,
    error,
});

const loadDatasetStatsComplete = () => ({
    type: LOAD_DATASET_STATS_COMPLETE
});

export const loadDatasetStats = datasetId => dispatch => {
    dispatch(loadDatasetStatsStart());

    axios.get(getDatasetsUrl(`statistics?datasetId=${datasetId}`))
        .then(resp => dispatch(loadDatasetStatsSuccess(datasetId, resp.data)))
        .catch(err => dispatch(loadDatasetStatsError(err)))
        .then(() => dispatch(loadDatasetStatsComplete()));
};

const loadDatasetConnectionsStart = () => ({
    type: LOAD_DATASET_CONNECTIONS_START
});

const loadDatasetConnectionsSuccess = (datasetId, datasetConnections) => ({
    type: LOAD_DATASET_CONNECTIONS_SUCCESS,
    datasetConnections,
    datasetId,
});

const loadDatasetConnectionsError = error => ({
    type: LOAD_DATASET_CONNECTIONS_ERROR,
    error,
});

const loadDatasetConnectionsComplete = () => ({
    type: LOAD_DATASET_CONNECTIONS_COMPLETE
});

export const loadDatasetConnections = datasetId => dispatch => {
    dispatch(loadDatasetConnectionsStart());

    axios.get(getDatasetsUrl(`connections?datasetId=${datasetId}`))
        .then(resp => dispatch(loadDatasetConnectionsSuccess(datasetId, resp.data)))
        .catch(err => dispatch(loadDatasetConnectionsError(err)))
        .then(() => dispatch(loadDatasetConnectionsComplete()));
};