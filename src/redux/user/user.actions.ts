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

export const clearError = (): UserActions => ({
	type: 'CLEAR_ERROR',
});
