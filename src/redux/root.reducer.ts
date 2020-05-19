import { combineReducers } from 'redux';
import mapReducer from './map/map.reducer';
import userReducer from './user/user.reducer';

export const rootReducer = combineReducers({
	mapState: mapReducer,
	userState: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
