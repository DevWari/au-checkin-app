
import { fork, all } from 'redux-saga/effects'

import customerLoginSaga from './customerLoginSaga'
import userLoginSaga from './userLoginSaga'

export default function* rootSaga () {
    yield all( [
        fork(userLoginSaga),
        fork(customerLoginSaga),
    ]);
}