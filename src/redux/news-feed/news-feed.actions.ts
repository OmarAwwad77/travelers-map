import { NewsFeedActions, Post } from './news-feed.types';

export const fetchPostsStart = (): NewsFeedActions => ({
	type: 'FETCH_POSTS_START',
});

export const fetchPostsSuccess = (posts: Post[]): NewsFeedActions => ({
	posts,
	type: 'FETCH_POSTS_SUCCESS',
});

export const fetchPostsFailure = (error: string): NewsFeedActions => ({
	error,
	type: 'FETCH_POSTS_FAILURE',
});
