import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './root.sagas';
import { rootReducer } from './root.reducer';

const sagaMiddleware = createSagaMiddleware();
const middleWares: Middleware[] = [sagaMiddleware];

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleWares))
);

sagaMiddleware.run(rootSagas);
