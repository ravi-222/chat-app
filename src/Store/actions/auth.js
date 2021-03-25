import * as actionTypes from "./actionTypes";
import { auth, provider } from "../../config";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authentication = () => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const result = await auth.signInWithPopup(provider);
      dispatch(authSuccess(result.user));
    } catch (error) {
      dispatch(authFail(error.message));
    }
  };
};
