import { all, fork } from 'redux-saga/effects';

import watchGetUsersSaga from './watchers/getUsers';
import { watchCreateInventorySaga, watchGetInventorySaga } from './watchers/inventory';
import watchLoginSaga from './watchers/login';

export default function* root() {
  yield all([
    fork(watchGetUsersSaga),
    fork(watchCreateInventorySaga),
    fork(watchGetInventorySaga),
    fork(watchLoginSaga),
  ]);
}
