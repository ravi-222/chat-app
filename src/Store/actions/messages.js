import * as actionTypes from "./actionTypes";
import db from "../../config";
const messageFetchStart = () => {
  return {
    type: actionTypes.MESSAGE_FETCH_START,
  };
};

const messageFetchSuccess = (messages) => {
  return {
    type: actionTypes.MESSAGE_FETCH_SUCCESS,
    messages: messages,
  };
};

const messageFetchFail = (error) => {
  return {
    type: actionTypes.MESSAGE_FETCH_FAIL,
    error: error,
  };
};

export const messageFetch = (roomId) => {
  return async (dispatch) => {
    try {
      dispatch(messageFetchStart());
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          dispatch(messageFetchSuccess(snapshot.docs.map((doc) => doc.data())));
        });
    } catch (error) {
      dispatch(messageFetchFail());
    }
  };
};
