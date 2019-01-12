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

const tileInfo = (state = [], action) => {
    switch (action.type) {
        case 'GET_INFO':
            return action.payload;
        default:
            return state;
    }
}

const favoriteArt = (state = [], action) => {
    switch (action.type) {
        case 'MAKE_FAVORITE':
            return [...state, action.payload];
        default:
            return state;
    }
}

const storeInstance = createStore(
    combineReducers({
        randomArt,
        tileInfo,
        favoriteArt,
    }),
    applyMiddleware(logger),
)

export default storeInstance;