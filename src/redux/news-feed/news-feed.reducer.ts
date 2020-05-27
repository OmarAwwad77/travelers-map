import {
	NewsFeedState,
	NewsFeedActions,
	Post,
	DbComment,
	Comment,
} from './news-feed.types';
import { User } from '../user/user.types';

const initialState: NewsFeedState = {
	posts: [],
	users: [],
	strangerPosts: [],
	loading: false,
	error: null,
};

const updatePostsLikeStatus = (
	posts: Post[],
	postId: string,
	liked: boolean,
	userId: string
) => {
	const postToUpdateIndex = posts.findIndex((post) => post.placeId === +postId);
	return posts.map((post, i) => {
		if (i === postToUpdateIndex) {
			return {
				...post,
				likes: liked
					? post.likes.filter((id: string) => id !== userId)
					: [...post.likes, userId],
			};
		} else {
			return post;
		}
	});
};

const updatePostsComments = (
	posts: Post[],
	replayToId: string,
	dbComment: DbComment,
	postId: string,
	commentId: string,
	user: User
) => {
	// prepare comment
	const { url, displayName } = user;
	const toBeAddedComment: Comment = {
		...dbComment,
		commentId,
		userImg: url,
		userName: displayName,
		comments: [],
	};

	// get the post
	const postToUpdate = {
		...posts.find((post) => post.placeId.toString() === postId)!,
	};
	let updatedPost: Post;

	if (replayToId === postId) {
		// topLevel Comment
		updatedPost = {
			...postToUpdate,
			comments: [...postToUpdate.comments, toBeAddedComment],
		};
	} else {
		// nested Comment
		updatedPost = {
			...postToUpdate,
			comments: postToUpdate.comments.map((comment) => {
				if (comment.commentId === replayToId) {
					return {
						...comment,
						comments: [...comment.comments, toBeAddedComment],
					};
				}
				return comment;
			}),
		};
	}

	return posts.map((post) => {
		if (post.placeId.toString() === postId) {
			return updatedPost;
		}
		return post;
	});
};

const newsFeedReducer = (
	state = initialState,
	action: NewsFeedActions
): NewsFeedState => {
	switch (action.type) {
		case 'FETCH_POSTS_START':
			return {
				...state,
				loading: true,
				error: null,
			};

		case 'FETCH_POSTS_SUCCESS':
			return {
				...state,
				posts: action.posts,
				loading: false,
			};

		case 'FETCH_USERS_SUCCESS':
			return {
				...state,
				users: action.users,
			};

		case 'FETCH_POSTS_FAILURE':
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case 'ADD_COMMENT_SUCCESS':
			return {
				...state,
				posts: updatePostsComments(
					state.posts,
					action.replayToId,
					action.comment,
					action.postId,
					action.commentId,
					action.user
				),
			};

		case 'LIKE_POST_TOGGLE_SUCCESS':
			return {
				...state,
				posts: updatePostsLikeStatus(
					state.posts,
					action.postId,
					action.liked,
					action.userId
				),
			};

		case 'LIKE_POST_TOGGLE_FAILURE':
			return {
				...state,
				posts: action.posts,
				error: action.error,
			};

		case 'FETCH_USER_POSTS_SUCCESS':
			return {
				...state,
				strangerPosts: action.posts,
			};

		case 'FETCH_USER_POSTS_FAILURE':
			return {
				...state,
				error: action.error,
			};

		default:
			return state;
	}
};

export default newsFeedReducer;
