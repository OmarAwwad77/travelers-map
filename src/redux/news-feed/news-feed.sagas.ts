import { call, put, apply, select, take, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
	getUserDocFromDb,
	DocumentSnapshot,
	QuerySnapshot,
	getCommentsForPost,
	getFeatures,
	getCommentById,
} from '../../firebase/firebase.utils';
import { Post, FETCH_POSTS_START, Comment } from './news-feed.types';
import { fetchPostsSuccess } from './news-feed.actions';

function* getComment(id: string): SagaIterator {
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
					nestedComments.map((commentId: string) => call(getComment, commentId))
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

function* getPlacesFromFeature(feature: any): SagaIterator<Post | Error> {
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
			commentsQuery.docs.map((doc) => call(getComment, doc.id))
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

function* getFeaturesFromDoc(doc: DocumentSnapshot): SagaIterator {
	const features = doc.data()?.userFeatures;
	return yield all(
		features.map((feature: any) => call(getPlacesFromFeature, feature))
	);
}

function* onFetchPostsSaga(): SagaIterator {
	yield take(FETCH_POSTS_START);
	try {
		const querySnapshot: QuerySnapshot = yield call(getFeatures);
		const posts = ((yield all(
			querySnapshot.docs.map((doc) => call(getFeaturesFromDoc, doc))
		)) as Post[][]).reduce<Post[]>((acc, curr) => [...acc, ...curr], []);
		console.log(posts);

		yield put(fetchPostsSuccess(posts));
	} catch (error) {
		console.log(error);
	}
}

export function* newsFeedSagas(): SagaIterator {
	yield all([call(onFetchPostsSaga)]);
}
