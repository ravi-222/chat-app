import * as actionTypes from "./actionTypes";
import { auth, provider } from "../../config";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_GOOGLE_SUCCESS,
    user: user,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authenticationGoogle = () => {
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

export const authenticationEmail = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      dispatch(authSuccess(result.user));
    } catch (error) {
      dispatch(authFail(error.message));
    }
  };
};
