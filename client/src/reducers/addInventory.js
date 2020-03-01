import {
  SET_ACTIVE_SERIES,
  SET_ACTIVE_ISSUE,
  SET_BIN,
  SET_TAG,
  SET_NOTES,
  SET_COST,
  SET_AQUIRED,
  SET_CONDITIONS,
  SET_ACTIVE_CONDITION,
  SET_GRADER,
  SET_VENDOR,
} from '../constants';

const initialState = {
  activeSeries: {},
  activeIssue: {},
  activeCondition: {},
  conditions: []
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_SERIES:
      return {
        ...state,
        activeSeries: action.activeSeries,
        activeIssue: initialState.activeIssue,
      };
    case SET_ACTIVE_ISSUE:
      return {
        ...state,
        activeIssue: action.activeIssue,
      };
    case SET_BIN:
      return {
        ...state,
        bin: action.bin,
      };
    case SET_TAG:
      return {
        ...state,
        tag: action.tag,
      };
    case SET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case SET_COST:
      return {
        ...state,
        cost: action.cost,
      };
    case SET_AQUIRED:
      return {
        ...state,
        aquired: action.aquired,
      };
    case SET_CONDITIONS: {
      return {
        ...state,
        conditions: action.conditions
      }
    }
    case SET_ACTIVE_CONDITION:
      return {
        ...state,
        activeCondition: action.condition,
      };
    case SET_GRADER:
      return {
        ...state,
        grader: action.grader,
      };
    case SET_VENDOR:
      return {
        ...state,
        vendor: action.vendor,
      };
    default:
      return state;
  }
}
