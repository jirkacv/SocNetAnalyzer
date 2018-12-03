import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import datasetsReducer from "./reducers/datasetsReducer";

const middleware = [
    thunk
];

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'PRODUCTION') {
    middleware.push(createLogger({ duration: true}));
}

const store = createStore(
    combineReducers({
        datasets: datasetsReducer
    }),
    applyMiddleware(...middleware)
);

export default store;
