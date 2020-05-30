import { createSelector } from 'reselect';
import { AppState } from '../root.reducer';

export const selectNewsFeedState = (state: AppState) => state.newsFeedState;

export const selectPosts = createSelector(
	[selectNewsFeedState],
	(newsFeed) => newsFeed.posts
);

export const selectUsers = createSelector(
	[selectNewsFeedState],
	(newsFeed) => newsFeed.users
);

export const selectStrangerPosts = createSelector(
	[selectNewsFeedState],
	(newsFeed) => newsFeed.strangerPosts
);

export const selectShowScrollButton = createSelector(
	[selectNewsFeedState],
	(newsFeed) => newsFeed.showScrollButton
);

export const selectMyPosts = createSelector(
	[selectNewsFeedState],
	(newsFeed) => newsFeed.myPosts
);
