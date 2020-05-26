import {
	call,
	put,
	select,
	takeLatest,
	take,
	all,
	throttle,
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
	getUserDocFromDb,
	DocumentSnapshot,
	QuerySnapshot,
	getCommentsForPost,
	getFeatures,
	getCommentById,
	arrayUnion,
	addCommentToDb,
	DocumentReference,
	addNestedComment,
	toggleLikingPost,
	getUsers,
} from '../../firebase/firebase.utils';
import {
	Post,
	FETCH_POSTS_START,
	Comment,
	ADD_COMMENT_START,
	AddCommentStart,
	DbComment,
	LIKE_POST_TOGGLE_START,
	LikePostToggleStart,
	User,
	FETCH_USERS_START,
} from './news-feed.types';
import {
	fetchPostsSuccess,
	addCommentSuccess,
	likePostToggleSuccess,
	likePostToggleFailure,
	fetchUsersSuccess,
} from './news-feed.actions';
import {
	selectUserId,
	selectUser,
	selectUserFollowsArr,
} from '../user/user.selectors';
import { selectPosts } from './news-feed.selectors';
import { DbUser, User as CurrentUser } from '../user/user.types';

function* getCommentSaga(id: string): SagaIterator {
	const commentDoc: DocumentSnapshot = yield call(getCommentById, id);

	if (commentDoc.exists) {
		const nestedComments = commentDoc.data()?.comments;
		const userDoc: DocumentSnapshot = yield call(
			getUserDocFromDb,
			commentDoc.data()?.userId
		);
		const ownerImg = userDoc.data()?.profileImg;
		const userName = userDoc.data()?.displayName;

		if (nestedComments.length) {
			return {
				...(commentDoc.data() as Comment),
				userName,
				commentId: commentDoc.id,
				userImg: ownerImg,
				comments: yield all(
					nestedComments.map((commentId: string) =>
						call(getCommentSaga, commentId)
					)
				),
			};
		} else {
			return {
				...(commentDoc.data() as Comment),
				userName,
				commentId: commentDoc.id,
				userImg: ownerImg,
			};
		}
	}
}

function* getPlacesFromFeatureSaga(feature: any): SagaIterator<Post | Error> {
	const userDoc: DocumentSnapshot = yield call(
		getUserDocFromDb,
		feature.properties.userId
	);

	const commentsQuery: QuerySnapshot = yield call(
		getCommentsForPost,
		feature.properties.placeId
	);

	if (userDoc.exists) {
		const comments: Comment[] = yield all(
			commentsQuery.docs.map((doc) => call(getCommentSaga, doc.id))
		);

		return {
			comments,
			placeCoords: feature.properties.placeCoords,
			placeId: feature.properties.placeId,
			placeDesc: feature.properties.placeDesc,
			placeImages: feature.properties.placeImages,
			placeName: feature.properties.placeName,
			tripId: feature.properties.tripId,
			userId: feature.properties.userId,
			createdAt: feature.properties.createdAt,
			likes: feature.properties.likes,
			userImg: userDoc.data()?.profileImg,
			userDisplayName: userDoc.data()?.displayName,
		};
	} else {
		return new Error("user doesn't exist");
	}
}

function* getFeaturesFromDocSaga(doc: DocumentSnapshot): SagaIterator {
	const features = doc.data()?.userFeatures;
	return yield all(
		features.map((feature: any) => call(getPlacesFromFeatureSaga, feature))
	);
}

function* addCommentSaga({
	replayToId,
	comment,
	postId,
}: AddCommentStart): SagaIterator {
	// const userId: string = yield select(selectUserId);
	const user: CurrentUser = yield select(selectUser);

	const dbComment: DbComment = {
		comment,
		userId: user.uid,
		createdAt: Date.now(),
		comments: [],
		postId: replayToId,
	};

	try {
		// save comment to DB
		const addedCommentRef: DocumentReference = yield call(
			addCommentToDb,
			dbComment
		);

		const addedCommentId = addedCommentRef.id;

		// check if it is nested
		const commentDoc: DocumentSnapshot = yield call(getCommentById, replayToId);

		if (commentDoc.exists) {
			// nested. update parent
			yield call(addNestedComment, commentDoc.ref, addedCommentId);
		}
		yield put(
			addCommentSuccess(replayToId, dbComment, postId, user, addedCommentId)
		);
	} catch (error) {
		console.log(error);
	}
}

function* likePostToggleSaga({
	liked,
	postOwnerId,
	postId,
}: LikePostToggleStart): SagaIterator {
	const userId = yield select(selectUserId);
	// const userId = 'b1EO0UrZOdW3J948w6TFLk2uKVQ2';
	const oldPosts = yield select(selectPosts);
	try {
		yield put(likePostToggleSuccess(postId, userId, liked));
		yield call(toggleLikingPost, liked, postOwnerId, postId, userId);
	} catch (error) {
		const message: string = error.message;
		yield put(likePostToggleFailure(message, oldPosts));
	}
}

function* onFetchPostsSaga(): SagaIterator {
	yield take(FETCH_POSTS_START);
	const userFollowsArr: string[] = yield select(selectUserFollowsArr);
	try {
		const querySnapshot: QuerySnapshot = yield call(
			getFeatures,
			userFollowsArr
		);
		const posts = ((yield all(
			querySnapshot.docs.map((doc) => call(getFeaturesFromDocSaga, doc))
		)) as Post[][]).reduce<Post[]>((acc, curr) => [...acc, ...curr], []);
		console.log(posts);

		yield put(fetchPostsSuccess(posts));
	} catch (error) {
		console.log(error);
	}
}

function* onAddCommentSaga(): SagaIterator {
	yield takeLatest(ADD_COMMENT_START, addCommentSaga);
}

function* onLikePostToggleSaga(): SagaIterator {
	yield throttle(1000, LIKE_POST_TOGGLE_START, likePostToggleSaga);
}

function* onFetchUsersSaga(): SagaIterator {
	yield take(FETCH_USERS_START);
	const userId: string = yield select(selectUserId);
	try {
		const usersQuery: QuerySnapshot = yield call(getUsers);
		let users: User[] = [];
		usersQuery.forEach(
			(doc) =>
				doc.id !== userId &&
				users.push({ userId: doc.id, ...(doc.data() as DbUser) })
		);
		yield put(fetchUsersSuccess(users));
	} catch (error) {
		console.log(error);
	}
}

export function* newsFeedSagas(): SagaIterator {
	yield all([
		call(onFetchPostsSaga),
		call(onAddCommentSaga),
		call(onLikePostToggleSaga),
		call(onFetchUsersSaga),
	]);
}
