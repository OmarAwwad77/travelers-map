import firebase, { firestore } from 'firebase/app';
import { User } from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { User as AppUser, DbUser } from '../redux/user/user.types';
import { Place } from '../redux/news-feed/news-feed.types';

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
export type DocumentSnapshot = firestore.DocumentSnapshot;
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

export const updateProfile = (updatedProfile: DbUser, userId: string) =>
	db.collection('users').doc(userId).update(updatedProfile);

export const createUserDocInDb = (
	user: { displayName: string },
	uid: string
) => {
	return db.collection('users').doc(uid).set(user);
};

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
export const getFeatures = async () => {
	const querySnapshot = await db.collection('features').get();
	let places: Place[] = [];
	querySnapshot.forEach((doc) => {
		doc.data().userFeatures.map((feature: any) => {
			places.push({
				placeCoords: feature.properties.placeCoords,
				placeId: feature.properties.placeId,
				placeDesc: feature.properties.placeDesc,
				placeImages: feature.properties.placeImages,
				placeName: feature.properties.placeName,
				tripId: feature.properties.tripId,
				userId: doc.id,
			});
		});
	});
	return places;
};

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
