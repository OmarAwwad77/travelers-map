import { NewsFeedActions, Post, DbComment, User } from './news-feed.types';
import { User as CurrentUser } from '../user/user.types';

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

export const fetchUsersStart = (): NewsFeedActions => ({
	type: 'FETCH_USERS_START',
});

export const fetchUsersSuccess = (users: User[]): NewsFeedActions => ({
	users,
	type: 'FETCH_USERS_SUCCESS',
});

export const fetchUsersFailure = (error: string): NewsFeedActions => ({
	error,
	type: 'FETCH_USERS_FAILURE',
});

export const addCommentStart = (
	replayToId: string,
	comment: string,
	postId: string
): NewsFeedActions => ({
	replayToId,
	comment,
	postId,
	type: 'ADD_COMMENT_START',
});

export const addCommentSuccess = (
	replayToId: string,
	comment: DbComment,
	postId: string,
	user: CurrentUser,
	commentId: string
): NewsFeedActions => ({
	replayToId,
	comment,
	postId,
	user,
	commentId,
	type: 'ADD_COMMENT_SUCCESS',
});

export const addCommentFailure = (error: string): NewsFeedActions => ({
	error,
	type: 'FETCH_POSTS_FAILURE',
});

export const likePostToggleStart = (
	postId: string,
	postOwnerId: string,
	liked: boolean
): NewsFeedActions => ({
	postId,
	liked,
	postOwnerId,
	type: 'LIKE_POST_TOGGLE_START',
});

export const likePostToggleSuccess = (
	postId: string,
	userId: string,
	liked: boolean
): NewsFeedActions => ({
	postId,
	userId,
	liked,
	type: 'LIKE_POST_TOGGLE_SUCCESS',
});

export const likePostToggleFailure = (
	error: string,
	posts: Post[]
): NewsFeedActions => ({
	error,
	posts,
	type: 'LIKE_POST_TOGGLE_FAILURE',
});
