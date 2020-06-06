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
	myPosts: [],
	loading: false,
	error: null,
	showScrollButton: false,
};

const updatePostsLikeStatus = (
	posts: Post[],
	myPosts: Post[],
	strangerPosts: Post[],
	postId: string,
	liked: boolean,
	userId: string
) => {
	const postToUpdate = [...posts, ...strangerPosts, ...myPosts].find(
		(post) => post.placeId.toString() === postId
	);

	// return posts.map((post, i) => {
	// 	if (i === postToUpdateIndex) {
	// 		return {
	// 			...post,
	// 			likes: liked
	// 			? post.likes.filter((id: string) => id !== userId)
	// 			: [...post.likes, userId],
	// 		};
	// 	} else {
	// 		return post;
	// 	}
	// });

	return {
		myPosts: myPosts.map((post) => {
			if (post.placeId === postToUpdate?.placeId) {
				return {
					...post,
					likes: liked
						? post.likes.filter((id: string) => id !== userId)
						: [...post.likes, userId],
				};
			} else {
				return post;
			}
		}),
		strangerPosts: strangerPosts.map((post) => {
			if (post.placeId === postToUpdate?.placeId) {
				return {
					...post,
					likes: liked
						? post.likes.filter((id: string) => id !== userId)
						: [...post.likes, userId],
				};
			} else {
				return post;
			}
		}),
		posts: posts.map((post) => {
			if (post.placeId === postToUpdate?.placeId) {
				return {
					...post,
					likes: liked
						? post.likes.filter((id: string) => id !== userId)
						: [...post.likes, userId],
				};
			} else {
				return post;
			}
		}),
	};
};

const updatePostsComments = (
	posts: Post[],
	myPosts: Post[],
	strangerPosts: Post[],
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
		...[...posts, ...strangerPosts, ...myPosts].find(
			(post) => post.placeId.toString() === postId
		)!,
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

	return {
		myPosts: myPosts.map((post) => {
			if (post.placeId.toString() === postId) {
				return updatedPost;
			}
			return post;
		}),
		strangerPosts: strangerPosts.map((post) => {
			if (post.placeId.toString() === postId) {
				return updatedPost;
			}
			return post;
		}),
		posts: posts.map((post) => {
			if (post.placeId.toString() === postId) {
				return updatedPost;
			}
			return post;
		}),
	};
};

const newsFeedReducer = (
	state = initialState,
	action: NewsFeedActions
): NewsFeedState => {
	switch (action.type) {
		case 'FETCH_POSTS_START':
		case 'FETCH_USER_POSTS_START':
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
				...updatePostsComments(
					state.posts,
					state.myPosts,
					state.strangerPosts,
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
				...updatePostsLikeStatus(
					state.posts,
					state.myPosts,
					state.strangerPosts,
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
				loading: false,
				strangerPosts: action.posts,
			};

		case 'FETCH_USER_POSTS_FAILURE':
			return {
				...state,
				error: action.error,
			};

		case 'FETCH_MY_POSTS_SUCCESS':
			return {
				...state,
				loading: false,
				myPosts: action.myPosts,
			};

		case 'FETCH_MY_POSTS_FAILURE':
			return {
				...state,
				error: action.error,
			};

		case 'TOGGLE_SHOW_SCROLL_BUTTON':
			return {
				...state,
				showScrollButton: !action.isVisible,
			};

		default:
			return state;
	}
};

export default newsFeedReducer;
