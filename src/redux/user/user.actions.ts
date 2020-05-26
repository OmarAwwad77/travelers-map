import {
	UserActions,
	SignInCredentials,
	User,
	ErrorMessage,
	SignUpCredentials,
} from './user.types';

export const emailSignInStart = (
	credentials: SignInCredentials
): UserActions => ({
	credentials,
	type: 'EMAIL_SIGN_IN_START',
});

export const googleSignInStart = (): UserActions => ({
	type: 'GOOGLE_SIGN_IN_START',
});

export const signInSuccess = (user: User): UserActions => ({
	user,
	type: 'SIGN_IN_SUCCESS',
});

export const signInFailure = (error: ErrorMessage): UserActions => ({
	error,
	type: 'SIGN_IN_FAILURE',
});

export const signUpStart = (credentials: SignUpCredentials): UserActions => ({
	credentials,
	type: 'SIGN_UP_START',
});

export const signUpFailure = (error: ErrorMessage): UserActions => ({
	error,
	type: 'SIGN_UP_FAILURE',
});

export const changePasswordStart = (
	oldPassword: string,
	newPassword: string
): UserActions => ({
	oldPassword,
	newPassword,
	type: 'CHANGE_PASSWORD_START',
});

export const changePasswordSuccess = (): UserActions => ({
	type: 'CHANGE_PASSWORD_SUCCESS',
});

export const changePasswordFailure = (error: ErrorMessage): UserActions => ({
	error,
	type: 'CHANGE_PASSWORD_FAILURE',
});

export const changeEmailStart = (
	newEmail: string,
	password: string
): UserActions => ({
	password,
	newEmail,
	type: 'CHANGE_EMAIL_START',
});

export const changeEmailSuccess = (newEmail: string): UserActions => ({
	newEmail,
	type: 'CHANGE_EMAIL_SUCCESS',
});

export const changeEmailFailure = (error: ErrorMessage): UserActions => ({
	error,
	type: 'CHANGE_EMAIL_FAILURE',
});

export const deleteAccountStart = (password?: string): UserActions => ({
	password,
	type: 'DELETE_ACCOUNT_START',
});

export const deleteAccountSuccess = (): UserActions => ({
	type: 'DELETE_ACCOUNT_SUCCESS',
});

export const deleteAccountFailure = (error: ErrorMessage): UserActions => ({
	error,
	type: 'DELETE_ACCOUNT_FAILURE',
});

export const updateProfileStart = (
	displayName: string,
	file: Blob | string,
	userId: string
): UserActions => ({
	displayName,
	file,
	userId,
	type: 'UPDATE_PROFILE_START',
});

export const updateProfileSuccess = (): UserActions => ({
	type: 'UPDATE_PROFILE_SUCCESS',
});

export const updateProfileFailure = (error: ErrorMessage): UserActions => ({
	error,
	type: 'UPDATE_PROFILE_FAILURE',
});

export const toggleFollowUserStart = (
	targetUserId: string,
	followed: boolean
): UserActions => ({
	targetUserId,
	followed,
	type: 'TOGGLE_FOLLOW_USER_START',
});

export const toggleFollowUserSuccess = (
	targetUserId: string,
	followed: boolean
): UserActions => ({
	targetUserId,
	followed,
	type: 'TOGGLE_FOLLOW_USER_SUCCESS',
});

export const toggleFollowUserFailure = (error: string): UserActions => ({
	error,
	type: 'TOGGLE_FOLLOW_USER_FAILURE',
});

export const clearError = (): UserActions => ({
	type: 'CLEAR_ERROR',
});
