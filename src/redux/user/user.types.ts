export interface User {
	displayName: string;
	email: string;
	uid: string;
}

export interface ErrorMessage {
	message: string;
	label: 'email' | 'password' | 'unknown';
	type: 'sign-in' | 'sign-up';
}

export interface UserState {
	user: User | null;
	loading: boolean;
	error: ErrorMessage | null;
}

export interface SignInCredentials {
	email: string;
	password: string;
}

export interface SignUpCredentials extends SignInCredentials {
	displayName: string;
}

export const GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START';
export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export interface GoogleSignInStart {
	type: typeof GOOGLE_SIGN_IN_START;
}

export interface EmailSignInStart {
	type: typeof EMAIL_SIGN_IN_START;
	credentials: SignInCredentials;
}

export interface SignInSuccess {
	type: typeof SIGN_IN_SUCCESS;
	user: User;
}

export interface SignInFailure {
	type: typeof SIGN_IN_FAILURE;
	error: ErrorMessage;
}

export interface SignUpStart {
	type: typeof SIGN_UP_START;
	credentials: SignUpCredentials;
}

export interface SignUpFailure {
	type: typeof SIGN_UP_FAILURE;
	error: ErrorMessage;
}

export interface ClearError {
	type: typeof CLEAR_ERROR;
}

export type UserActions =
	| GoogleSignInStart
	| EmailSignInStart
	| SignInSuccess
	| SignInFailure
	| SignUpStart
	| SignUpFailure
	| ClearError;
