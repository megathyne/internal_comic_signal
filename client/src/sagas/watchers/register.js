import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { REGISTER_SAGA } from '../../constants';
import { saveToken } from '../../actions';
import { APIPost } from '../../api/api';

function* setAuthToken(token) {
  yield localStorage.setItem('accessToken', token.accessToken);
}

function* workerRegisterSaga(action) {
  const token = yield call(APIPost, 'auth/signup', action.user);
  if (token.statusCode !== 400) {
    yield call(setAuthToken, token);
    yield put(saveToken(token));
    yield put(push('/'));
  }
}

export default function* watchRegisterSaga() {
  yield takeLatest(REGISTER_SAGA, workerRegisterSaga);
}
