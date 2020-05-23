import { NewsFeedState, NewsFeedActions } from './news-feed.types';

const initialState: NewsFeedState = {
	posts: [],
	users: [],
	loading: false,
	error: null,
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

		case 'FETCH_POSTS_FAILURE':
			return {
				...state,
				error: action.error,
				loading: false,
			};

		default:
			return state;
	}
};

export default newsFeedReducer;
