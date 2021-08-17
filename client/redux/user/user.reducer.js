import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: "",
  isFetching: false,
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        isFetching: true,
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: "",
        isFetching: false,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case UserActionTypes.LOG_OUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: "",
      };

    case UserActionTypes.USER_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        error: "",
      };

    case UserActionTypes.USER_AUTHENTICATION_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
