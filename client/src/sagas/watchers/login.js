import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_SAGA } from '../../constants';
import { saveToken } from '../../actions';
import { APIPost } from '../../api/api';

function* setAuthToken(token) {
  yield localStorage.setItem('accessToken', token.accessToken);
}

function* workerLoginSaga(action) {
  const token = yield call(APIPost, 'auth/signin', action.user);
  if (token.statusCode != 400) {
    yield call(setAuthToken, token);
    yield put(saveToken(token));
    yield put(push('/'));
  }
}

export default function* watchLoginSaga() {
  yield takeLatest(LOGIN_SAGA, workerLoginSaga);
}
