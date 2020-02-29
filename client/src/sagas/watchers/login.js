import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { LOGIN_SAGA } from '../../constants';
import { login } from '../../lib/api';
import { saveToken } from '../../actions';

function* workerLoginSaga(action) {
  const token = yield call(login, action.user);
  localStorage.setItem('accessToken', token.accessToken);
  yield put(saveToken(token));
  yield put(push('/'));
}

export default function* watchLoginSaga() {
  yield takeLatest(LOGIN_SAGA, workerLoginSaga);
}
