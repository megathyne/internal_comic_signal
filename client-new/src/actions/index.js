import { GET_USERS_SAGA, SET_USERS } from '../constants';
import { LOGIN_SAGA } from '../constants';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}

//Sagas
export function getUsersSaga() {
  return {
    type: GET_USERS_SAGA
  };
}

export function loginSaga(user) {
  return {
    type: LOGIN_SAGA,
    user
  }
}



