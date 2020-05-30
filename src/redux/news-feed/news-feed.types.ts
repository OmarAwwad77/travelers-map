import { DbUser } from '../user/user.types';
import { Place } from '../map/map.types';
import { User as CurrentUser } from '../user/user.types';

export interface User extends DbUser {
	userId: string;
}

export interface Comment {
	commentId: string;
	userName: string;
	userImg: string;
	comment: string;
	postId: string;
	userId: string;
	createdAt: number;
	comments: Comment[];
}

export interface DbComment {
	comment: string;
	createdAt: number;
	postId: string;
	userId: string;
	comments: DbComment[];
}

export interface Post extends Place {
	userImg: string;
	userDisplayName: string;
	comments: Comment[];
}

export interface NewsFeedState {
	posts: Post[];
	users: User[];
	strangerPosts: Post[];
	myPosts: Post[];
	loading: boolean;
	error: string | null;
	showScrollButton: boolean;
}

export const FETCH_MY_POSTS_START = 'FETCH_MY_POSTS_START';
export const FETCH_MY_POSTS_SUCCESS = 'FETCH_MY_POSTS_SUCCESS';
export const FETCH_MY_POSTS_FAILURE = 'FETCH_MY_POSTS_FAILURE';
export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_COMMENT_START = 'ADD_COMMENT_START';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const LIKE_POST_TOGGLE_START = 'LIKE_POST_TOGGLE_START';
export const LIKE_POST_TOGGLE_SUCCESS = 'LIKE_POST_TOGGLE_SUCCESS';
export const LIKE_POST_TOGGLE_FAILURE = 'LIKE_POST_TOGGLE_FAILURE';
export const FETCH_USER_POSTS_START = 'FETCH_USER_POSTS_START';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';
export const TOGGLE_SHOW_SCROLL_BUTTON = 'TOGGLE_SHOW_SCROLL_BUTTON';

export interface FetchMyPostsStart {
	type: typeof FETCH_MY_POSTS_START;
	userId: string;
}

export interface FetchMyPostsSuccess {
	type: typeof FETCH_MY_POSTS_SUCCESS;
	myPosts: Post[];
}

export interface FetchMyPostsFailure {
	type: typeof FETCH_MY_POSTS_FAILURE;
	error: string;
}

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

export interface FetchUsersStart {
	type: typeof FETCH_USERS_START;
}

export interface FetchUsersSuccess {
	type: typeof FETCH_USERS_SUCCESS;
	users: User[];
}

export interface FetchUsersFailure {
	type: typeof FETCH_USERS_FAILURE;
	error: string;
}

export interface AddCommentStart {
	type: typeof ADD_COMMENT_START;
	comment: string;
	replayToId: string;
	postId: string;
}

export interface AddCommentSuccess {
	type: typeof ADD_COMMENT_SUCCESS;
	replayToId: string;
	comment: DbComment;
	postId: string;
	commentId: string;
	user: CurrentUser;
}

export interface AddCommentFailure {
	type: typeof ADD_COMMENT_FAILURE;
	error: string;
}

export interface LikePostToggleStart {
	type: typeof LIKE_POST_TOGGLE_START;
	liked: boolean;
	postOwnerId: string;
	postId: string;
}

export interface LikePostToggleSuccess {
	type: typeof LIKE_POST_TOGGLE_SUCCESS;
	postId: string;
	userId: string;
	liked: boolean;
}

export interface LikePostToggleFailure {
	type: typeof LIKE_POST_TOGGLE_FAILURE;
	error: string;
	posts: Post[];
}

export interface FetchUserPostsStart {
	type: typeof FETCH_USER_POSTS_START;
	userId: string;
	forCurrentUser?: boolean;
}

export interface FetchUserPostsSuccess {
	type: typeof FETCH_USER_POSTS_SUCCESS;
	posts: Post[];
}

export interface FetchUserPostsFailure {
	type: typeof FETCH_USER_POSTS_FAILURE;
	error: string;
}

export interface ShowScrollButton {
	type: typeof TOGGLE_SHOW_SCROLL_BUTTON;
	isVisible: boolean;
}

export type NewsFeedActions =
	| FetchMyPostsStart
	| FetchMyPostsSuccess
	| FetchMyPostsFailure
	| FetchPostsStart
	| FetchPostsSuccess
	| FetchPostsFailure
	| FetchUsersStart
	| FetchUsersSuccess
	| FetchUsersFailure
	| AddCommentStart
	| AddCommentSuccess
	| AddCommentFailure
	| LikePostToggleStart
	| LikePostToggleSuccess
	| LikePostToggleFailure
	| FetchUserPostsStart
	| FetchUserPostsSuccess
	| FetchUserPostsFailure
	| ShowScrollButton;
