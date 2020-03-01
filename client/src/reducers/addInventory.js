import {
  SET_ACTIVE_SERIES,
  SET_ACTIVE_ISSUE,
  SET_BIN,
  SET_TAG,
  SET_NOTES,
  SET_COST,
  SET_AQUIRED,
  SET_ACTIVE_CONDITION,
  SET_ACTIVE_PAGE,
  SET_ACTIVE_GRADER,
  SET_ACTIVE_VENDOR,
  SET_INVENTORY,
} from '../constants';

const initialState = {
  activeSeries: {},
  activeIssue: {},
  inventory: [],
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
    case SET_ACTIVE_CONDITION:
      return {
        ...state,
        activeCondition: action.activeCondition,
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.activePage,
      };
    case SET_ACTIVE_GRADER:
      return {
        ...state,
        activeGrader: action.activeGrader,
      };
    case SET_ACTIVE_VENDOR:
      return {
        ...state,
        activeVendor: action.activeVendor,
      };
    case SET_INVENTORY:
      return {
        ...state,
        inventory: action.inventory,
      };
    default:
      return state;
  }
}
