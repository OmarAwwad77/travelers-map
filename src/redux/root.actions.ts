import { MapActions } from './map/map.types';
import { UserActions } from './user/user.types';

export {
	addPlace,
	addTrip,
	deleteTrip,
	setTrips,
	setPlaces,
	setMapConfig,
	setMarkerToAdd,
} from './map/map.actions';

export {
	setCurrentUser,
	emailSignInStart,
	googleSignInStart,
	signInSuccess,
	signInFailure,
	signUpStart,
	signUpFailure,
	signOut,
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
	fetchMyPostsStart,
	fetchMyPostsSuccess,
	fetchMyPostsFailure,
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
	fetchUserPostSuccess,
	fetchUserPostsFailure,
	fetchUserPostsStart,
	toggleShowScrollButton,
} from './news-feed/news-feed.actions';

export type StoreActions = MapActions | UserActions;
