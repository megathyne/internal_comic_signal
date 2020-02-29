import { SET_TOKEN } from '../constants';

const initialState = { token: "", authenticated: false };

export default function createState(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
}
