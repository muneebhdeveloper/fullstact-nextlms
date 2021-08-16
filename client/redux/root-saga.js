import { all, call } from "@redux-saga/core/effects";
import userSaga from "./user/user.saga";

export default function* watcherSaga() {
  yield all([call(userSaga)]);
}
