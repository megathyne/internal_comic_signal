import { takeLatest, select, call, put } from 'redux-saga/effects';

import { CREATE_INVENTORY_SAGA, GET_INVENTORY_SAGA } from '../../constants';
import { APIPost, APIGet } from '../../api/api';
import { setInventory } from '../../actions';

const getActiveSeries = state => state.addInventory.activeSeries;
const getActiveIssueId = state => state.addInventory.activeIssue.id;
const getBin = state => state.addInventory.bin;
const getTag = state => state.addInventory.tag;
const getNotes = state => state.addInventory.notes;
const getCost = state => state.addInventory.cost;
const getAquired = state => state.addInventory.acquired;
const getActiveConditionId = state => state.addInventory.activeCondition.id;
const getActivePageId = state => state.addInventory.activePage.id;
const getActiveGraderId = state => state.addInventory.activeGrader.id;
const getActiveVendorId = state => state.addInventory.activeVendor.id;

function* workerCreateInventorySaga() {
  const createInventoryDto = {
    bin: yield select(getBin),
    tag: yield select(getTag),
    notes: yield select(getNotes),
    cost: yield select(getCost),
    acquired: yield select(getAquired),
    issueId: yield select(getActiveIssueId),
    conditionId: yield select(getActiveConditionId),
    graderId: yield select(getActiveGraderId),
    pageId: yield select(getActivePageId),
    graderId: yield select(getActiveGraderId),
    vendorId: yield select(getActiveVendorId),
  };
  const response = yield call(APIPost, 'inventory', createInventoryDto);
  const inventory = yield call(APIGet, 'inventory');
  yield put(setInventory(inventory));
}

function* workerGetInventorySaga() {
  const inventory = yield call(APIGet, 'inventory');
  yield put(setInventory(inventory));
}

export function* watchCreateInventorySaga() {
  yield takeLatest(CREATE_INVENTORY_SAGA, workerCreateInventorySaga);
}

export function* watchGetInventorySaga() {
  yield takeLatest(GET_INVENTORY_SAGA, workerGetInventorySaga);
}
