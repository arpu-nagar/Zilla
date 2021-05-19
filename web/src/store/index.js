import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

export const store = createStore(
	combinedReducers,
	composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
