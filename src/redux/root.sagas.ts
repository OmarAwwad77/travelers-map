import { userSagas } from './user/user.sagas';
import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

function* rootSagas(): SagaIterator {
	yield all([call(userSagas)]);
}

export default rootSagas;
