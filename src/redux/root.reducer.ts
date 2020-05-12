import { combineReducers } from 'redux';
import mapReducer from './map/map.reducer';

export const rootReducer = combineReducers({
	map: mapReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
