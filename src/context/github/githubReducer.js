import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SHOW_CLEAR,
  SET_ALERT
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repos: action.payload
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload
      };
    case SHOW_CLEAR:
      return {
        ...state,
        showClear: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        showClear: true
      };
    case CLEAR_USERS: {
      return {
        ...state,
        users: [],
        loading: false,
        showClear: false
      };
    }
    default:
      return state;
  }
};
