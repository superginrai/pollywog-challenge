import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

const randomArt = (state = [], action) => {
    switch (action.type) {
        case 'ELASTIC_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

const storeInstance = createStore(
    combineReducers({
   randomArt,
    }),
    applyMiddleware(logger),
)

    export default storeInstance;