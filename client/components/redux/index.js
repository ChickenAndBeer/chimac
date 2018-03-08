import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleWare from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools.extension';

import user from './user';
import game from './game';
import auth from './auth';

const reducer = combineReducers({ user, game, auth })
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true })))

const store = createStore(reducer, middleware)

export default store;
export * from './user';
export * from './game';
export * from './auth';
