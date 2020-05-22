import { call, put, apply, select, take, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getFeatures } from '../../firebase/firebase.utils';
import { Place } from './news-feed.types';
import { fetchPlacesSuccess } from './news-feed.actions';

function* onFetchPlacesSaga(): SagaIterator {
	yield take();
	try {
		const places: Place[] = yield call(getFeatures);
		yield put(fetchPlacesSuccess(places));
	} catch (error) {
		console.log(error);
	}
}

export function* newsFeedSagas(): SagaIterator {
	yield all([call(onFetchPlacesSaga)]);
}
