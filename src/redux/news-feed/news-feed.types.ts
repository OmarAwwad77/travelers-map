import { DbUser } from '../user/user.types';
import { Place } from '../map/map.types';

export interface User extends DbUser {
	userId: string;
}

export interface Comment {
	commentId: string;
	comment: string;
	postId: string;
	userId: string;
	userImg: string;
	userName: string;
	createdAt: number;
	comments: Comment[];
}

export interface Post extends Place {
	userImg: string;
	userDisplayName: string;
	comments: Comment[];
}

export interface NewsFeedState {
	posts: Post[];
	users: User[];
	loading: boolean;
	error: string | null;
}

export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export interface FetchPostsStart {
	type: typeof FETCH_POSTS_START;
}

export interface FetchPostsSuccess {
	type: typeof FETCH_POSTS_SUCCESS;
	posts: Post[];
}

export interface FetchPostsFailure {
	type: typeof FETCH_POSTS_FAILURE;
	error: string;
}

export type NewsFeedActions =
	| FetchPostsStart
	| FetchPostsSuccess
	| FetchPostsFailure;
