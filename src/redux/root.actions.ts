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
	changeEmailStart,
	changeEmailSuccess,
	changeEmailFailure,
	deleteAccountStart,
	deleteAccountSuccess,
	deleteAccountFailure,
	updateProfileStart,
	updateProfileSuccess,
	updateProfileFailure,
	toggleFollowUserFailure,
	toggleFollowUserStart,
	toggleFollowUserSuccess,
	clearError,
} from './user/user.actions';

export {
	fetchPostsFailure,
	fetchPostsStart,
	fetchPostsSuccess,
	fetchUsersStart,
	fetchUsersSuccess,
	fetchUsersFailure,
	addCommentStart,
	addCommentFailure,
	addCommentSuccess,
	likePostToggleStart,
	likePostToggleSuccess,
	likePostToggleFailure,
} from './news-feed/news-feed.actions';

export type StoreActions = MapActions | UserActions;
