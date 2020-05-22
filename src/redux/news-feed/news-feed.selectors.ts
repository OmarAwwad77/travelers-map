import { createSelector } from 'reselect';
import { AppState } from '../root.reducer';

export const selectNewsFeedState = (state: AppState) => state.newsFeedState;

export const selectPlaces = createSelector(
	[selectNewsFeedState],
	(newsFeed) => newsFeed.places
);

export const selectUsers = createSelector(
	[selectNewsFeedState],
	(newsFeed) => newsFeed.users
);
