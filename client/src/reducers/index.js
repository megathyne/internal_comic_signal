import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authReducer from './auth';

export const history = createBrowserHistory();

// import usersReducer from './users';

export default combineReducers({
  // usersReducer,
  authReducer,
  router: connectRouter(history),
});
