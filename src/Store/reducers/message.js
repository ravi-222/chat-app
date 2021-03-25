import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utilities/utility";

//initialisation of state
const initialState = {
  messages: [],
  error: null,
  loading: false,
};

//method for MESSAGE_FETCH_START
const messageFetchStart = (state, action) => {
  const newData = {
    loading: true,
    error: null,
  };
  return updateObject(state, newData);
};

//method for MESSAGE_FETCH_SUCCESS
const messageFetchSuccess = (state, action) => {
  const newData = {
    messages: action.messages,
    loading: false,
    error: null,
  };
  return updateObject(state, newData);
};

////method for MESSAGE_FETCH_FAIL
const messageFetchFail = (state, action) => {
  const newData = {
    loading: false,
    error: action.error,
  };
  return updateObject(state, newData);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_FETCH_START:
      return messageFetchStart(state, action);
    case actionTypes.MESSAGE_FETCH_SUCCESS:
      return messageFetchSuccess(state, action);
    case actionTypes.MESSAGE_FETCH_FAIL:
      return messageFetchFail(state, action);
    default:
      return state;
  }
};

export default reducer;
