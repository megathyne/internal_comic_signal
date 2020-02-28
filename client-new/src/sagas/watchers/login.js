import { takeLatest, call } from 'redux-saga/effects';

import { LOGIN_SAGA } from '../../constants';
import { login } from '../../lib/api';

function* workerLoginSaga(action) {
  const token = yield call(login, action.user);
  console.log(token)
  // yield(put(saveToken(token));
}

export default function* watchLoginSaga() {
  yield takeLatest(LOGIN_SAGA, workerLoginSaga);
}