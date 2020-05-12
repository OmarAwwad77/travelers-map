import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './root.reducer';

const middleWares: Middleware[] = [];

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleWares))
);
