import { all, fork } from 'redux-saga/effects';

import watchGetUsersSaga from './watchers/getUsers';
import watchLoginSaga from './watchers/login';

export default function* root() {
  yield all([
    fork(watchGetUsersSaga),
    fork(watchLoginSaga)
  ]);
}
