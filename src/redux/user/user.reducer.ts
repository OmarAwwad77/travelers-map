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
		case 'CHANGE_EMAIL_FAILURE':
		case 'CHANGE_PASSWORD_FAILURE':
		case 'DELETE_ACCOUNT_FAILURE':
		case 'UPDATE_PROFILE_FAILURE':
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case 'GOOGLE_SIGN_IN_START':
		case 'EMAIL_SIGN_IN_START':
		case 'SIGN_UP_START':
		case 'CHANGE_PASSWORD_START':
		case 'CHANGE_EMAIL_START':
		case 'DELETE_ACCOUNT_START':
		case 'UPDATE_PROFILE_START':
			return {
				...state,
				error: null,
				loading: true,
			};

		case 'CHANGE_EMAIL_SUCCESS':
			return {
				...state,
				user: {
					...state.user!,
					email: action.newEmail,
				},
			};

		case 'DELETE_ACCOUNT_SUCCESS':
			return {
				...state,
				user: null,
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
