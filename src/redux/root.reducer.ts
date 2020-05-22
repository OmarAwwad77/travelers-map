import { combineReducers } from 'redux';
import mapReducer from './map/map.reducer';
import userReducer from './user/user.reducer';
import newsFeedReducer from './news-feed/news-feed.reducer';

export const rootReducer = combineReducers({
	mapState: mapReducer,
	userState: userReducer,
	newsFeedState: newsFeedReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
