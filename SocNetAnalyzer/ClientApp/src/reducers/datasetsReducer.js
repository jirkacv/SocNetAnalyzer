import {
    LOAD_DATASETS_SUCCESS,
    CREATE_DATASET_SUCCESS,
    IMPORT_DATASET_SUCCESS,
    DELETE_DATASET_START,
    LOAD_DATASET_STATS_SUCCESS,
    LOAD_DATASET_CONNECTIONS_SUCCESS
} from '../actions/actionTypes'


const initialState = {
    items: new Map([]),
    stats: new Map([]),
    connections: new Map([]),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DATASETS_SUCCESS:
            return {
                ...state,
                items: new Map(action.datasets.map(d => [d.id, d])),
            }

        case CREATE_DATASET_SUCCESS:
            return {
                ...state,
                items: new Map(state.items.set(action.dataset.id, action.dataset)),
            }

        case IMPORT_DATASET_SUCCESS: {
            const { items } = state;

            if (items.has(action.datasetId)) {
                let dataset = items.get(action.datasetId);
                dataset.status = 1;
                items.set(dataset.id, { ...dataset, status: 1 })
            }

            return {
                ...state,
                items: new Map(items),
            }
        }

        case DELETE_DATASET_START: {
            const { items } = state;
            items.delete(action.datasetId);

            return {
                ...state,
                items: new Map(items),
            }
        }

        case LOAD_DATASET_STATS_SUCCESS: {
            let stats = state.stats;
            stats.set(action.datasetId, action.datasetStats);

            return {
                ...state,
                stats: new Map(stats),
            };
        }

        case LOAD_DATASET_CONNECTIONS_SUCCESS: {
            let connections = state.connections;
            connections.set(action.datasetId, action.datasetConnections);

            return {
                ...state,
                connections: new Map(connections),
            };
        }


        default:
            return state;
    }
}