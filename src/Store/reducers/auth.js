import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/utility";

//State initialization
const initialState = {
  user: null,
  error: null,
  loading: false,
};
// method for AUTH_START
const authStart = (state, action) => {
  const newData = { error: null, loading: true };
  return updateObject(state, newData);
};

//method for AUTH_SUCCESS
const authSuccess = (state, action) => {
  const newData = {
    user: action.user,
    error: null,
    loading: false,
  };
  return updateObject(state, newData);
};

//method for AUTH_FAIL
const authFail = (state, action) => {
  const newData = { error: action.error, loading: false };
  return updateObject(state, newData);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    default:
      return state;
  }
};

export default reducer;
