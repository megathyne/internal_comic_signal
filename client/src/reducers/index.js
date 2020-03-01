import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authReducer from './auth';
import addInventory from './addInventory';

export const history = createBrowserHistory();

// import usersReducer from './users';

export default combineReducers({
  // usersReducer,
  authReducer,
  addInventory,
  router: connectRouter(history),
});
