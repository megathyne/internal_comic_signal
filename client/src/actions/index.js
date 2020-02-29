import { GET_USERS_SAGA, SET_USERS } from '../constants';
import { LOGIN_SAGA, SET_TOKEN } from '../constants';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function getUsersSaga() {
  return {
    type: GET_USERS_SAGA,
  };
}

export function loginSaga(user) {
  return {
    type: LOGIN_SAGA,
    user,
  };
}

export function saveToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}
