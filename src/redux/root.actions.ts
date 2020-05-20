import { MapActions } from './map/map.types';
import { UserActions } from './user/user.types';

export {
	addPlace,
	addTrip,
	setTrips,
	setPlaces,
	setMapConfig,
	setMarkerToAdd,
} from './map/map.actions';

export {
	emailSignInStart,
	googleSignInStart,
	signInSuccess,
	signInFailure,
	signUpStart,
	signUpFailure,
	changePasswordStart,
	changePasswordFailure,
	changePasswordSuccess,
	deleteAccount,
	clearError,
} from './user/user.actions';

export type StoreActions = MapActions | UserActions;
