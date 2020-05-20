export interface User {
	displayName: string;
	email: string;
	uid: string;
}

export interface ErrorMessage {
	message: string;
	label: 'email' | 'password' | 'oldPassword' | 'unknown';
	type: 'sign-in' | 'sign-up' | 'changePassword';
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
export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
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

export interface ChangePasswordStart {
	type: typeof CHANGE_PASSWORD_START;
	oldPassword: string;
	newPassword: string;
}

export interface ChangePasswordSuccess {
	type: typeof CHANGE_PASSWORD_SUCCESS;
}

export interface ChangePasswordFailure {
	type: typeof CHANGE_PASSWORD_FAILURE;
	error: ErrorMessage;
}

export interface DeleteAccount {
	type: typeof DELETE_ACCOUNT;
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
	| ChangePasswordStart
	| ChangePasswordSuccess
	| ChangePasswordFailure
	| DeleteAccount
	| ClearError;
