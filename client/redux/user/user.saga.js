import { takeLatest, put, all } from "@redux-saga/core/effects";
import { UserActionTypes } from "./user.types";
import { signInSuccess, signInFailure, logOutUserSuccess } from "./user.action";
import axios from "axios";

function* signInStart({ payload }) {
  try {
    const { data } = yield axios.post("/api/v1/login", {
      ...payload,
    });
    if (data.error === true) {
      yield put(signInFailure(data.message));
    } else {
      yield put(signInSuccess(data.user));
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  } catch (err) {
    console.log("Error", err.message);
  }
}

function* logOutStart() {
  try {
    const { data } = yield axios.get("/api/v1/logout");
    yield localStorage.removeItem("user");
    yield put(logOutUserSuccess());
  } catch (err) {
    console.log(err);
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(UserActionTypes.SIGN_IN_START, signInStart),
    takeLatest(UserActionTypes.LOG_OUT_USER, logOutStart),
  ]);
}
