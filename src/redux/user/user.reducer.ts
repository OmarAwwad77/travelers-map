import { UserState, UserActions, User } from './user.types';

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
	redirectTo: '',
};

const updateUserFollowsArr = (
	user: User,
	targetUserId: string,
	followed: boolean
): User => {
	const updatedUser = {
		...user,
		follows: followed
			? user.follows.filter((id) => id !== targetUserId)
			: [...user.follows, targetUserId],
	};
	localStorage.setItem('user', JSON.stringify(updatedUser));
	return updatedUser;
};

const setCurrentUser = (): User | null => {
	const storageUser = localStorage.getItem('user');
	if (!storageUser) return null;
	return JSON.parse(storageUser) as User;
};

const signOut = () => {
	localStorage.removeItem('user');
	return null;
};

const userReducer = (state = initialState, action: UserActions): UserState => {
	switch (action.type) {
		case 'SET_CURRENT_USER':
			return {
				...state,
				user: setCurrentUser(),
			};

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
				loading: false,
				redirectTo: '/profile',
				user: {
					...state.user!,
					email: action.newEmail,
				},
			};

		case 'UPDATE_PROFILE_SUCCESS':
			return {
				...state,
				loading: false,
				redirectTo: '/profile',
				user: {
					...state.user!,
					url: action.url,
					displayName: action.displayName,
				},
			};

		case 'CHANGE_PASSWORD_SUCCESS':
			return {
				...state,
				loading: false,
				redirectTo: '/profile',
			};

		case 'DELETE_ACCOUNT_SUCCESS':
			return {
				...state,
				loading: false,
				user: signOut(),
			};

		case 'TOGGLE_FOLLOW_USER_SUCCESS':
			return {
				...state,
				user: updateUserFollowsArr(
					state.user!,
					action.targetUserId,
					action.followed
				),
			};

		case 'SIGN_OUT':
			return {
				...state,
				user: signOut(),
			};

		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
			};

		case 'RESET_REDIRECT_TO':
			return {
				...state,
				redirectTo: '',
			};

		default:
			return state;
	}
};

export default userReducer;
