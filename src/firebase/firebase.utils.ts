import firebase, { firestore } from 'firebase/app';
import { User } from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { User as AppUser, DbUser } from '../redux/user/user.types';
import { Post, DbComment } from '../redux/news-feed/news-feed.types';
import { Feature } from 'react-leaflet-draw';

const config = {
	apiKey: 'AIzaSyCqTuRU04Iv39jAhk5jxrLDBYUDVkXRcd4',
	authDomain: 'connect-c44e6.firebaseapp.com',
	databaseURL: 'https://connect-c44e6.firebaseio.com',
	projectId: 'connect-c44e6',
	storageBucket: 'connect-c44e6.appspot.com',
	messagingSenderId: '824320863105',
	appId: '1:824320863105:web:6e073d540fcca1f6e31680',
};
// Initialize Firebase
firebase.initializeApp(config);

export type FirebaseUser = User;
export type DocumentReference = firestore.DocumentReference;
export type DocumentSnapshot = firestore.DocumentSnapshot;

export type QuerySnapshot = firestore.QuerySnapshot;
export const arrayUnion = firestore.FieldValue.arrayUnion;
export const arrayRemove = firestore.FieldValue.arrayRemove;
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storageRef = firebase.storage().ref();
export const EmailAuthProvider = firebase.auth.EmailAuthProvider;
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const getCurrentUser = () => {
	return new Promise<User | null>((res, rej) => {
		const unsubscribe = auth.onAuthStateChanged(
			(user) => {
				unsubscribe();
				res(user);
			},
			(error) => {
				unsubscribe();
				rej(error);
			}
		);
	});
};

export const updateProfile = (
	updatedProfile: Partial<DbUser>,
	userId: string
) => db.collection('users').doc(userId).update(updatedProfile);

export const createUserDocInDb = (user: DbUser, uid: string) => {
	return db.collection('users').doc(uid).set(user);
};

export const getUsers = () => db.collection('users').get();

export const getUserDocFromDb = (uid: string) => {
	return db.collection('users').doc(uid).get();
};

export const uploadImage = (file: File | Blob) => {
	return new Promise<string>(async (resolve) => {
		const snapshot = await storageRef.child(`images/${Date.now()}`).put(file);

		const url = await snapshot.task.snapshot.ref.getDownloadURL();
		resolve(url);
	});
};

// citiesRef.where('country', 'in', ['USA', 'Japan']);
// https://firebase.google.com/docs/firestore/query-data/queries
export const getCommentsForPost = (postId: string) =>
	db.collection('comments').where('postId', '==', postId.toString()).get();

export const getCommentById = (id: string) =>
	db.collection('comments').doc(id).get();

export const addCommentToDb = (comment: DbComment) =>
	db.collection('comments').add(comment);

export const addNestedComment = (
	commentRef: DocumentReference,
	commentId: string
) =>
	commentRef.update({
		comments: arrayUnion(commentId),
	});

export const toggleLikingPost = async (
	liked: boolean,
	postOwnerId: string,
	postId: string,
	userId: string
) => {
	const featureDoc = await db.collection('features').doc(postOwnerId).get();

	if (featureDoc.exists) {
		const userFeatures: Feature[] = featureDoc.data()?.userFeatures;
		const placeIdToUpdate = userFeatures.findIndex(
			(feature) => feature.properties?.id === +postId
		);
		console.log(placeIdToUpdate);
		const updatedUserFeatures = userFeatures.map((feature, i) => {
			if (i === placeIdToUpdate) {
				return {
					...feature,
					properties: {
						...feature.properties,
						likes: liked
							? feature.properties?.likes.filter((id: string) => id !== userId)
							: [...feature.properties?.likes, userId],
					},
				};
			} else {
				return feature;
			}
		});

		await featureDoc.ref.update({
			userFeatures: updatedUserFeatures,
		});
	}
};

export const toggleFollowUser = async (
	currentUserId: string,
	targetUserId: string,
	followed: boolean
) => {
	const userDocRef = await db.collection('users').doc(currentUserId);
	const action = followed ? arrayRemove : arrayUnion;

	await userDocRef.update({
		follows: action(targetUserId),
	});
};

export const updateTargetUser = async (
	targetUserId: string,
	currentUserId: string,
	followed: boolean
) => {
	const userDocRef = await db.collection('users').doc(targetUserId);
	const action = followed ? arrayRemove : arrayUnion;

	await userDocRef.update({
		followers: action(currentUserId),
	});
};

export const getFeaturesById = (userId: string) =>
	db.collection('features').doc(userId).get();

export const getFeatures = (userFollows: string[]) =>
	db
		.collection('features')
		.where(firestore.FieldPath.documentId(), 'in', userFollows)
		.get();

interface PlaceToAdd {
	tripId?: string;
	tripName: string;
	userId: string;
	placeId: string;
	coords: number[];
	placeDesc: string;
	placeImages: string[];
}
export const addPlace = async (place: PlaceToAdd) => {
	try {
		const trip = {
			tripName: place.tripName,
			userId: place.userId,
			places: [
				{
					placeId: place.placeId,
					placeDesc: place.placeDesc,
					coords: place.coords,
					placeImages: place.placeImages,
				},
			],
		};
		await db.collection('trips').add(trip);

		console.log('place added', place);
	} catch (error) {
		console.log('error adding a place', place);
	}
};

export const deleteUserFeatures = async (userId: string) => {
	const doc = await db.collection('features').doc(userId).get();
	if (doc.exists) {
		return doc.ref.delete();
	}
};

export const deleteUserFromDb = async (userId: string) => {
	const doc = await db.collection('users').doc(userId).get();
	if (doc.exists) {
		return doc.ref.delete();
	}
};

export const deleteUserTrips = async (userId: string) => {
	const doc = await db.collection('trips').doc(userId).get();
	if (doc.exists) {
		return doc.ref.delete();
	}
};

export const deleteUserComments = async (userId: string) => {
	const queryDocs = await db
		.collection('comments')
		.where('userId', '==', userId)
		.get();

	let outerToDelete = queryDocs.docs.map((doc) => doc.id);
	const nestedToDelete = await Promise.all<string[]>(
		queryDocs.docs.map(
			async (doc) =>
				await Promise.all<string>(
					doc
						.data()
						?.comments.map(
							async (commentId: string) =>
								await (await db.collection('comments').doc(commentId).get()).id
						)
				)
		)
	);
	const idsToDelete = new Set([
		...outerToDelete,
		...nestedToDelete.reduce((acc, curr) => [...acc, ...curr], []),
	]);

	idsToDelete.forEach((id) =>
		db
			.collection('comments')
			.doc(id as string)
			.delete()
	);
};

export const fetchFollowers = async (followersArr: string[]) => {
	if (!followersArr.length) return [];
	const followersQuery = await db
		.collection('users')
		.where(firestore.FieldPath.documentId(), 'in', followersArr)
		.get();

	return followersQuery.docs;
};

export const fetchFollows = async (followsArr: string[]) => {
	if (!followsArr.length) return [];
	const followsQuery = await db
		.collection('users')
		.where(firestore.FieldPath.documentId(), 'in', followsArr)
		.get();

	return followsQuery.docs;
};
