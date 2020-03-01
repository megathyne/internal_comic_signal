import {
  GET_USERS_SAGA,
  SET_USERS,
  SET_ACTIVE_SERIES,
  SET_ACTIVE_ISSUE,
  SET_BIN,
  SET_TAG,
  SET_NOTES,
  SET_COST,
  SET_AQUIRED,
  SET_ACTIVE_CONDITION,
  SET_ACTIVE_GRADER,
  SET_ACTIVE_VENDOR,
  SET_ACTIVE_PAGE,
  CREATE_INVENTORY_SAGA,
  GET_INVENTORY_SAGA,
  SET_INVENTORY,
} from '../constants';
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

export function createInventorySaga(createInventory) {
  return {
    type: CREATE_INVENTORY_SAGA,
    createInventory,
  };
}

export function getInventorySaga() {
  return {
    type: GET_INVENTORY_SAGA,
  };
}

export function setInventory(inventory) {
  return {
    type: SET_INVENTORY,
    inventory,
  };
}

export function saveToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function setActiveSeries(activeSeries) {
  return {
    type: SET_ACTIVE_SERIES,
    activeSeries,
  };
}

export function setActiveIssue(activeIssue) {
  return {
    type: SET_ACTIVE_ISSUE,
    activeIssue,
  };
}

export function setBin(bin) {
  return {
    type: SET_BIN,
    bin,
  };
}

export function setTag(tag) {
  return {
    type: SET_TAG,
    tag,
  };
}

export function setNotes(notes) {
  return {
    type: SET_NOTES,
    notes,
  };
}

export function setCost(cost) {
  return {
    type: SET_COST,
    cost,
  };
}

export function setAquired(aquired) {
  return {
    type: SET_AQUIRED,
    aquired,
  };
}

export function setActiveCondition(activeCondition) {
  return {
    type: SET_ACTIVE_CONDITION,
    activeCondition,
  };
}

export function setActivePage(activePage) {
  return {
    type: SET_ACTIVE_PAGE,
    activePage,
  };
}

export function setActiveGrader(activeGrader) {
  return {
    type: SET_ACTIVE_GRADER,
    activeGrader,
  };
}

export function setActiveVendor(activeVendor) {
  return {
    type: SET_ACTIVE_VENDOR,
    activeVendor,
  };
}
