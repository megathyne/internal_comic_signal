import { APIGet } from '../../api/api';

function* workerConditionSaga(action) {
  const conditions = yield call(APIGet('condition'));

}
