export interface User {
	displayName: string;
	email: string;
	uid: string;
	providerId: string;
	url: string;
}

export interface ErrorMessage {
	message: string;
	label: 'email' | 'password' | 'oldPassword' | 'unknown';
	type:
		| 'sign-in'
		| 'sign-up'
		| 'changePassword'
		| 'changeEmail'
		| 'deleteAccount'
		| 'updateProfile';
}

export interface DbUser {
	displayName: string;
	profileImg: string;
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
export const CHANGE_EMAIL_START = 'CHANGE_EMAIL_START';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_FAILURE = 'CHANGE_EMAIL_FAILURE';
export const DELETE_ACCOUNT_START = 'DELETE_ACCOUNT_START';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';
export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
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

export interface ChangeEmailStart {
	type: typeof CHANGE_EMAIL_START;
	newEmail: string;
	password: string;
}

export interface ChangeEmailSuccess {
	type: typeof CHANGE_EMAIL_SUCCESS;
	newEmail: string;
}

export interface ChangeEmailFailure {
	type: typeof CHANGE_EMAIL_FAILURE;
	error: ErrorMessage;
}

export interface DeleteAccountStart {
	type: typeof DELETE_ACCOUNT_START;
	password?: string;
}

export interface DeleteAccountSuccess {
	type: typeof DELETE_ACCOUNT_SUCCESS;
}

export interface DeleteAccountFailure {
	type: typeof DELETE_ACCOUNT_FAILURE;
	error: ErrorMessage;
}

export interface UpdateProfileStart {
	type: typeof UPDATE_PROFILE_START;
	displayName: string;
	file: Blob | string;
	userId: string;
}

export interface UpdateProfileSuccess {
	type: typeof UPDATE_PROFILE_SUCCESS;
}

export interface UpdateProfileFailure {
	type: typeof UPDATE_PROFILE_FAILURE;
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
	| ChangePasswordStart
	| ChangePasswordSuccess
	| ChangePasswordFailure
	| ChangeEmailStart
	| ChangeEmailSuccess
	| ChangeEmailFailure
	| DeleteAccountStart
	| DeleteAccountSuccess
	| DeleteAccountFailure
	| UpdateProfileStart
	| UpdateProfileSuccess
	| UpdateProfileFailure
	| ClearError;
