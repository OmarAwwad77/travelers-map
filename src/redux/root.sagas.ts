import { userSagas } from './user/user.sagas';
import { newsFeedSagas } from './news-feed/news-feed.sagas';
import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

function* rootSagas(): SagaIterator {
	yield all([call(userSagas), call(newsFeedSagas)]);
}

export default rootSagas;
