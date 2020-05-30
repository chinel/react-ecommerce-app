import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import {  persistStore } from 'redux-persist';
/* import thunk  from 'redux-thunk'; */
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [/* thunk */sagaMiddleware];

//here using node env we would used this to only apply the redux middleware logger only on developement environment
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}


export const store =  createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {store, persistor} // we have to export default here incase we need to make reference to the unpersisted store