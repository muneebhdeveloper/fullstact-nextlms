import { UserActionTypes } from "./user.types";

export const signInStart = (credentials) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: credentials,
});

export const signInSuccess = (data) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: data,
});

export const signInFailure = (errorMessage) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage,
});

export const logOutUser = () => ({
  type: UserActionTypes.LOG_OUT_USER,
});

export const logOutUserSuccess = () => ({
  type: UserActionTypes.LOG_OUT_USER_SUCCESS,
});
