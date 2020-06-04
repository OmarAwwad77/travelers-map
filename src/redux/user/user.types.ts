export interface User {
	displayName: string;
	email: string;
	uid: string;
	providerId: string;
	url: string;
	follows: string[];
	followers: string[];
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
	follows: string[];
	followers: string[];
}

export interface UserState {
	user: User | null;
	loading: boolean;
	error: ErrorMessage | null;
	redirectTo: string;
}

export interface SignInCredentials {
	email: string;
	password: string;
}

export interface SignUpCredentials extends SignInCredentials {
	displayName: string;
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START';
export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';
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
export const TOGGLE_FOLLOW_USER_START = 'TOGGLE_FOLLOW_USER_START';
export const TOGGLE_FOLLOW_USER_SUCCESS = 'TOGGLE_FOLLOW_USER_SUCCESS';
export const TOGGLE_FOLLOW_USER_FAILURE = 'TOGGLE_FOLLOW_USER_FAILURE';
export const RESET_REDIRECT_TO = 'RESET_REDIRECT_TO';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export interface SetCurrentUser {
	type: typeof SET_CURRENT_USER;
}

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

export interface SignOut {
	type: typeof SIGN_OUT;
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
	url: string;
	displayName: string;
}

export interface UpdateProfileFailure {
	type: typeof UPDATE_PROFILE_FAILURE;
	error: ErrorMessage;
}

export interface ToggleFollowUserStart {
	type: typeof TOGGLE_FOLLOW_USER_START;
	targetUserId: string;
	followed: boolean;
}

export interface ToggleFollowUserSuccess {
	type: typeof TOGGLE_FOLLOW_USER_SUCCESS;
	targetUserId: string;
	followed: boolean;
}

export interface ToggleFollowUserFailure {
	type: typeof TOGGLE_FOLLOW_USER_FAILURE;
	error: string;
}

export interface ClearError {
	type: typeof CLEAR_ERROR;
}

export interface ResetRedirectTo {
	type: typeof RESET_REDIRECT_TO;
}

export type UserActions =
	| SetCurrentUser
	| GoogleSignInStart
	| EmailSignInStart
	| SignInSuccess
	| SignInFailure
	| SignUpStart
	| SignUpFailure
	| SignOut
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
	| ToggleFollowUserStart
	| ToggleFollowUserSuccess
	| ToggleFollowUserFailure
	| ClearError
	| ResetRedirectTo;
