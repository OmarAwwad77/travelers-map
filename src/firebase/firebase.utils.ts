import firebase, { firestore } from 'firebase/app';
import { User } from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { User as AppUser } from '../redux/user/user.types';

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

export const createUserDocInDb = (user: AppUser) => {
	return db.collection('users').doc(user.uid!).set(user);
};

export const getUserDocFromDb = (uid: string) => {
	return db.collection('users').doc(uid).get();
};

export const uploadImage = (file: File) => {
	return new Promise<string>(async (resolve) => {
		const snapshot = await storageRef.child(`images/${Date.now()}`).put(file);

		const url = await snapshot.task.snapshot.ref.getDownloadURL();
		resolve(url);
	});
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

// trips:{
// 	trip:
// 		{
// 			tripName:// got it
// 			userId //got it
// 			places:[
// 				{
// 					id:// got it
// 					coords:// got it
// 					placeDesc: //got it
// 					images: []// got it
// 				}
// 			]
// 		}

// 		}
