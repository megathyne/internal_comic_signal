import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { LOGIN_SAGA } from '../../constants';
import { login } from '../../lib/api';
import { saveToken } from '../../actions';
import { APIPost } from '../../api/api';

function* workerLoginSaga(action) {
  // const token = yield call(login, action.user);
  const token = yield call(APIPost, 'auth/signin', action.user)
  console.log(token)
  if (token.statusCode != 400) {
    localStorage.setItem('accessToken', token.accessToken);
    yield put(saveToken(token));
    yield put(push('/'));
  }
}

export default function* watchLoginSaga() {
  yield takeLatest(LOGIN_SAGA, workerLoginSaga);
}
