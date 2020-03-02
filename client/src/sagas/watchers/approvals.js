import { takeLatest, select, call, put } from 'redux-saga/effects';
import { GET_PENDING_APPROVALS_SAGA } from '../../constants';
import { APIGet } from '../../api/api';

function* workerGetPendingApprovalsSaga(action) {
  const pendingApprovals = yield call(APIGet, `approvals/pending/${action.inventoryId}`);
}

export function* watchGetPendingApprovalsSaga() {
  yield takeLatest(GET_PENDING_APPROVALS_SAGA, workerGetPendingApprovalsSaga);
}
