import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';



const storeInstance = createStore(
    combineReducers({
   
    }),
    applyMiddleware(logger),
)

    export default storeInstance;