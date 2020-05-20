import { UserState, UserActions } from './user.types';

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
};

const userReducer = (state = initialState, action: UserActions): UserState => {
	switch (action.type) {
		case 'SIGN_IN_SUCCESS':
			return {
				...state,
				user: action.user,
				loading: false,
			};

		case 'SIGN_IN_FAILURE':
		case 'SIGN_UP_FAILURE':
		case 'CHANGE_PASSWORD_FAILURE':
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case 'GOOGLE_SIGN_IN_START':
		case 'EMAIL_SIGN_IN_START':
		case 'SIGN_UP_START':
		case 'CHANGE_PASSWORD_START':
			return {
				...state,
				error: null,
				loading: true,
			};

		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export default userReducer;
