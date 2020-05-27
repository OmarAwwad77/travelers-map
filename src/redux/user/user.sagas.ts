import {
	call,
	apply,
	takeLatest,
	all,
	put,
	select,
	take,
	delay,
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
	auth,
	googleProvider,
	FirebaseUser,
	createUserDocInDb,
	getUserDocFromDb,
	DocumentSnapshot,
	getCurrentUser,
	EmailAuthProvider,
	GoogleAuthProvider,
	updateProfile,
	uploadImage,
	toggleFollowUser,
	updateTargetUser,
	deleteUserFeatures,
	deleteUserFromDb,
	deleteUserTrips,
	deleteUserComments,
} from '../../firebase/firebase.utils';
import {
	EMAIL_SIGN_IN_START,
	GOOGLE_SIGN_IN_START,
	CHANGE_PASSWORD_START,
	SIGN_UP_START,
	DELETE_ACCOUNT_START,
	CHANGE_EMAIL_START,
	EmailSignInStart,
	SignUpStart,
	User,
	ChangePasswordStart,
	ChangeEmailStart,
	DeleteAccountStart,
	DbUser,
	UPDATE_PROFILE_START,
	UpdateProfileStart,
	TOGGLE_FOLLOW_USER_START,
	ToggleFollowUserStart,
	SIGN_OUT,
} from './user.types';
import {
	signInSuccess,
	signInFailure,
	signUpFailure,
	changePasswordFailure,
	changePasswordSuccess,
	changeEmailSuccess,
	changeEmailFailure,
	deleteAccountSuccess,
	deleteAccountFailure,
} from '../root.actions';
import {
	updateProfileFailure,
	updateProfileSuccess,
	toggleFollowUserSuccess,
} from './user.actions';
import { selectUserId, selectUser } from './user.selectors';

const defaultUserImg =
	'https://firebasestorage.googleapis.com/v0/b/connect-c44e6.appspot.com/o/images%2Fuser.svg?alt=media&token=ef7689a1-9619-4265-bd81-674e50437dd5';

function* putUserOnSuccess(appUser: User): SagaIterator {
	yield put(signInSuccess(appUser));
	localStorage.setItem('user', JSON.stringify(appUser));
}

function* updateLocalStorageUser(updatedFields: Partial<User>): SagaIterator {
	const storageUser: User = yield JSON.parse(localStorage.getItem('user')!);
	localStorage.setItem(
		'user',
		JSON.stringify({ ...storageUser, ...updatedFields })
	);
}

function* reAuthSaga(password: string): SagaIterator {
	const firebaseUser: FirebaseUser = yield call(getCurrentUser);

	// re-authenticate user
	const credentials = yield apply(
		EmailAuthProvider,
		EmailAuthProvider.credential,
		[firebaseUser.email!, password]
	);

	yield apply(firebaseUser, firebaseUser.reauthenticateWithCredential, [
		credentials,
	]);

	return firebaseUser;
}

function* emailSignInSaga({
	credentials: { email, password },
}: EmailSignInStart): SagaIterator {
	try {
		const { user }: { user: FirebaseUser } = yield apply(
			auth,
			auth.signInWithEmailAndPassword,
			[email, password]
		);
		const doc: DocumentSnapshot = yield call(getUserDocFromDb, user.uid);
		if (doc.exists) {
			const dbUser = doc.data() as DbUser;
			const appUser: User = {
				displayName: dbUser.displayName,
				email: user.email!,
				uid: user.uid,
				follows: dbUser.follows,
				followers: dbUser.followers,
				providerId: user.providerData[0]?.providerId!,
				url: dbUser.profileImg,
			};
			yield call(putUserOnSuccess, appUser);
		} else {
			throw { code: 'auth/user-not-found' };
		}
	} catch (error) {
		switch (error.code) {
			case 'auth/wrong-password':
				yield put(
					signInFailure({
						message: 'Wrong password',
						label: 'password',
						type: 'sign-in',
					})
				);
				break;

			case 'auth/user-not-found':
				yield put(
					signInFailure({
						message: "User Doesn't Exist",
						label: 'email',
						type: 'sign-in',
					})
				);
				break;

			case 'auth/invalid-email':
				yield put(
					signInFailure({
						message: 'Invalid Email',
						label: 'email',
						type: 'sign-in',
					})
				);
				break;

			default:
				yield put(
					signInFailure({
						message: 'something went wrong. try again later',
						label: 'unknown',
						type: 'sign-in',
					})
				);
		}
	}
}

function* googleSignInSaga(): SagaIterator {
	try {
		const { user }: { user: FirebaseUser } = yield apply(
			auth,
			auth.signInWithPopup,
			[googleProvider]
		);

		const doc: DocumentSnapshot = yield call(getUserDocFromDb, user.uid);
		if (doc.exists) {
			const dbUser = doc.data() as DbUser;
			const appUser: User = {
				email: user.email!,
				uid: user.uid,
				followers: dbUser.followers,
				follows: dbUser.follows,
				displayName: dbUser.displayName,
				providerId: user.providerData[0]?.providerId!,
				url: dbUser.profileImg,
			};
			yield call(putUserOnSuccess, appUser);
		} else {
			const appUser: User = {
				email: user.email!,
				uid: user.uid,
				followers: [],
				follows: [],
				displayName: user.email!.substring(0, user.email!.indexOf('@')),
				providerId: user.providerData[0]?.providerId!,
				url: defaultUserImg,
			};
			const dbUser: DbUser = {
				displayName: appUser.displayName,
				profileImg: appUser.url,
				followers: [],
				follows: [],
			};

			yield call(createUserDocInDb, dbUser, user.uid);
			yield call(putUserOnSuccess, appUser);
		}
	} catch (error) {
		if (error.code === 'auth/popup-closed-by-user') {
			yield put(
				signInFailure({
					message: 'action canceled by the user',
					label: 'unknown',
					type: 'sign-in',
				})
			);
		} else {
			yield put(
				signInFailure({
					message: 'something went wrong. try again later',
					label: 'unknown',
					type: 'sign-in',
				})
			);
		}
	}
}

function* signUpSaga({
	credentials: { email, password, displayName },
}: SignUpStart): SagaIterator {
	try {
		const { user }: { user: FirebaseUser } = yield apply(
			auth,
			auth.createUserWithEmailAndPassword,
			[email, password]
		);

		const appUser: User = {
			displayName,
			email: user.email!,
			uid: user.uid,
			followers: [],
			follows: [],
			providerId: user.providerData[0]?.providerId!,
			url: defaultUserImg,
		};
		const dbUser: DbUser = {
			displayName,
			profileImg: defaultUserImg,
			follows: [],
			followers: [],
		};

		yield call(createUserDocInDb, dbUser, user.uid);

		yield call(putUserOnSuccess, appUser);
	} catch (error) {
		switch (error.code) {
			case 'auth/email-already-in-use':
				yield put(
					signUpFailure({
						message: 'This Email is Taken. try another one',
						label: 'email',
						type: 'sign-up',
					})
				);
				break;

			case 'auth/weak-password':
				yield put(
					signUpFailure({
						message: 'Weak Password',
						label: 'password',
						type: 'sign-up',
					})
				);
				break;

			case 'auth/invalid-email':
				yield put(
					signUpFailure({
						message: 'Invalid Email',
						label: 'email',
						type: 'sign-up',
					})
				);
				break;

			default:
				yield put(
					signUpFailure({
						message: 'something went wrong. try again later',
						label: 'unknown',
						type: 'sign-up',
					})
				);
		}
	}
}

function* changePasswordSaga({
	oldPassword,
	newPassword,
}: ChangePasswordStart): SagaIterator {
	try {
		// get current user and reAuthenticate
		const firebaseUser: FirebaseUser = yield call(reAuthSaga, oldPassword);

		// change password
		yield apply(firebaseUser, firebaseUser.updatePassword, [newPassword]);

		yield put(changePasswordSuccess());
	} catch (error) {
		switch (error.code) {
			case 'auth/wrong-password':
				yield put(
					changePasswordFailure({
						label: 'oldPassword',
						type: 'changePassword',
						message: 'The password is invalid.',
					})
				);
				break;

			default:
				yield put(
					changePasswordFailure({
						label: 'unknown',
						message: 'something went wrong. try again later',
						type: 'changePassword',
					})
				);
		}
	}
}

function* changeEmailSaga({
	newEmail,
	password,
}: ChangeEmailStart): SagaIterator {
	try {
		// get current user and reAuthenticate
		const firebaseUser: FirebaseUser = yield call(reAuthSaga, password);

		//change email
		yield apply(firebaseUser, firebaseUser.updateEmail, [newEmail]);

		// update localStorage User
		yield call(updateLocalStorageUser, { email: newEmail });

		// update the state
		yield put(changeEmailSuccess(newEmail));
	} catch (error) {
		switch (error.code) {
			case 'auth/wrong-password':
				yield put(
					changeEmailFailure({
						label: 'password',
						message: 'The Password is Invalid.',
						type: 'changeEmail',
					})
				);
				break;

			default:
				yield put(
					changeEmailFailure({
						label: 'unknown',
						message: 'something went wrong. try again later',
						type: 'changeEmail',
					})
				);
		}
	}
}

function* deleteAccountSaga({ password }: DeleteAccountStart): SagaIterator {
	try {
		// get current user and reAuthenticate
		let firebaseUser: FirebaseUser;
		if (password) {
			firebaseUser = yield call(reAuthSaga, password);
		} else {
			firebaseUser = yield call(getCurrentUser);
			yield apply(firebaseUser, firebaseUser.reauthenticateWithPopup, [
				GoogleAuthProvider,
			]);
		}

		const userId = firebaseUser.uid;

		yield apply(firebaseUser, firebaseUser.delete, []);
		// delete user's features
		yield call(deleteUserFeatures, userId);
		// delete user form db
		yield call(deleteUserFromDb, userId);
		// delete user trips
		yield call(deleteUserTrips, userId);
		// delete user comments
		yield call(deleteUserComments, userId);
		// delete auth user

		yield put(deleteAccountSuccess());
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case 'auth/wrong-password':
				yield put(
					deleteAccountFailure({
						label: 'password',
						message: 'The Password is Invalid.',
						type: 'deleteAccount',
					})
				);
				break;

			default:
				yield put(
					deleteAccountFailure({
						label: 'unknown',
						message: 'something went wrong. try again later',
						type: 'deleteAccount',
					})
				);
		}
	}
}

function* updateProfileSage({
	displayName,
	file,
	userId,
}: UpdateProfileStart): SagaIterator {
	const updatedProfile: Partial<DbUser> = {
		displayName,
		profileImg: '',
	};
	try {
		if (typeof file === 'string') {
			updatedProfile.profileImg = file;
		} else {
			const url: string = yield call(uploadImage, file);
			updatedProfile.profileImg = url;
		}
		yield call(updateProfile, updatedProfile, userId);

		// update localStorage User
		yield call(updateLocalStorageUser, {
			url: updatedProfile.profileImg,
			displayName: updatedProfile.displayName,
		});

		yield put(
			updateProfileSuccess(
				updatedProfile.profileImg!,
				updatedProfile.displayName!
			)
		);
	} catch (error) {
		console.log(error);
		yield put(
			updateProfileFailure({
				label: 'unknown',
				message: 'something went wrong. try again later',
				type: 'updateProfile',
			})
		);
	}
}

function* toggleFollowUserSaga({
	targetUserId,
	followed,
}: ToggleFollowUserStart): SagaIterator {
	const currentUserId = yield select(selectUserId);
	try {
		yield all([
			call(toggleFollowUser, currentUserId, targetUserId, followed),
			call(updateTargetUser, targetUserId, currentUserId, followed),
		]);

		yield put(toggleFollowUserSuccess(targetUserId, followed));
	} catch (error) {
		console.log(error);
	}
}

function* onEmailSignInSaga(): SagaIterator {
	yield takeLatest(EMAIL_SIGN_IN_START, emailSignInSaga);
}

function* onGoogleSignInSaga(): SagaIterator {
	yield takeLatest(GOOGLE_SIGN_IN_START, googleSignInSaga);
}

function* onSignUpSaga(): SagaIterator {
	yield takeLatest(SIGN_UP_START, signUpSaga);
}

function* onSignOutSaga(): SagaIterator {
	while (true) {
		yield take(SIGN_OUT);
		yield apply(auth, auth.signOut, []);
	}
}

function* onChangePasswordSaga(): SagaIterator {
	yield takeLatest(CHANGE_PASSWORD_START, changePasswordSaga);
}

function* onChangeEmailSaga(): SagaIterator {
	yield takeLatest(CHANGE_EMAIL_START, changeEmailSaga);
}

function* onDeleteAccountSaga(): SagaIterator {
	yield takeLatest(DELETE_ACCOUNT_START, deleteAccountSaga);
}

function* onUpdateProfileSaga(): SagaIterator {
	yield takeLatest(UPDATE_PROFILE_START, updateProfileSage);
}

function* onToggleFollowUserSaga(): SagaIterator {
	// yield takeLatest( TOGGLE_FOLLOW_USER_START, toggleFollowUserSaga);
	while (true) {
		const action = yield take(TOGGLE_FOLLOW_USER_START);
		yield call(toggleFollowUserSaga, action);
		yield delay(500);
	}
}

export function* userSagas(): SagaIterator {
	yield all([
		call(onEmailSignInSaga),
		call(onGoogleSignInSaga),
		call(onSignUpSaga),
		call(onChangePasswordSaga),
		call(onChangeEmailSaga),
		call(onDeleteAccountSaga),
		call(onUpdateProfileSaga),
		call(onToggleFollowUserSaga),
		call(onSignOutSaga),
	]);
}
