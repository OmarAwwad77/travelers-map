import { NewsFeedState, NewsFeedActions } from './news-feed.types';

const initialState: NewsFeedState = {
	places: [],
	users: [],
	loading: false,
	error: null,
};

const newsFeedReducer = (
	state = initialState,
	action: NewsFeedActions
): NewsFeedState => {
	switch (action.type) {
		case 'FETCH_PLACES_START':
			return {
				...state,
				loading: true,
				error: null,
			};

		case 'FETCH_PLACES_SUCCESS':
			return {
				...state,
				places: action.places,
				loading: false,
			};

		case 'FETCH_PLACES_FAILURE':
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
