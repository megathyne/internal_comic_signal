import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import createHistory from "history/createBrowserHistory";
import authReducer from './auth';


export const history = createHistory();

// import usersReducer from './users';

export default combineReducers({
  // usersReducer,
  authReducer,
  router: connectRouter(history),
});
