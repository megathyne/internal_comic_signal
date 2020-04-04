import { SET_TOKEN } from '../constants';

const currentToken = localStorage.getItem('accessToken');
const initialState = {
  // token: currentToken ? currentToken : null,
  authenticated: currentToken ? true : false,
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      console.log('setting token');
      return {
        ...state,
        // token: action.accessToken,
        authenticated: true,
      };
    }
    default:
      return state;
  }
}
