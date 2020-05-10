import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

export const db = firebase.firestore();
export const auth = firebase.auth();

// features {
//   userId
//   features: [
//     { // Feature
//       geometry:{ // Geometry
//         type, // Geometry from geojson as GeometryType
//         coordinates:[ // []

//         ]
//       },

//     }
//   ]
// }
