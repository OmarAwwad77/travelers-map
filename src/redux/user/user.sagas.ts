import { call, apply, takeLatest, all, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
	auth,
	googleProvider,
	FirebaseUser,
	createUserDocInDb,
	getUserDocFromDb,
	DocumentSnapshot,
} from '../../firebase/firebase.utils';
import {
	EMAIL_SIGN_IN_START,
	EmailSignInStart,
	SignUpStart,
	User,
	GOOGLE_SIGN_IN_START,
	SIGN_UP_START,
} from './user.types';
import { signInSuccess, signInFailure, signUpFailure } from '../root.actions';

function* putUserOnSuccess(appUser: User): SagaIterator {
	yield put(signInSuccess(appUser));
	localStorage.setItem('user', JSON.stringify(appUser));
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
			const appUser: User = doc.data() as User;
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
			const user: User = doc.data() as User;
			yield put(signInSuccess(user));
		} else {
			const appUser: User = {
				email: user.email!,
				uid: user.uid,
				displayName: user.email!.substring(0, user.email!.indexOf('@')),
			};

			yield call(createUserDocInDb, appUser);
			yield put(signInSuccess(appUser));
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
		};

		yield call(createUserDocInDb, appUser);
		yield put(signInSuccess(appUser));
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

function* onEmailSignInSaga(): SagaIterator {
	yield takeLatest(EMAIL_SIGN_IN_START, emailSignInSaga);
}

function* onGoogleSignInSaga(): SagaIterator {
	yield takeLatest(GOOGLE_SIGN_IN_START, googleSignInSaga);
}

function* onSignUpSaga(): SagaIterator {
	yield takeLatest(SIGN_UP_START, signUpSaga);
}

export function* userSagas(): SagaIterator {
	yield all([
		call(onEmailSignInSaga),
		call(onGoogleSignInSaga),
		call(onSignUpSaga),
	]);
}

// type: 'SIGN_IN_FAILURE',
// error: {
// 					message: 'something went wrong. try again later',
// 					label: 'unknown',
// 				}
