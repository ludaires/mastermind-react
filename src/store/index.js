import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunkMiddleware))
  );
};
