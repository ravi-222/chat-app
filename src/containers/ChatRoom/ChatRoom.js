import React, { useState, useEffect, useRef, Fragment } from "react";
import "./ChatRoom.css";
import { useParams } from "react-router-dom";
import db, { storage } from "../../config";
import firebase from "firebase";
import Chat from "../../components/Chat/Chat";
import { messageFetch } from "../../store/actions/messages";
//import MediaPreview from "../../components/MediaPreview/MediaPreview";
import { useSelector, useDispatch } from "react-redux";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [files, setFiles] = useState();
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  //const [url, setUrl] = useState();
  const [typing, setTyping] = useState([]);
  const [refMessage, setRefmessage] = useState(null);
  //const [preview, setPreview] = useState(false);
  const dispatch = useDispatch();

  //useEffect for fetching all the messages and the typing status
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
          setTyping(snapshot.data().typing);
          dispatch(messageFetch(roomId));
        });
    }
  }, [roomId]);

  //for sending the message to firebase
  const sendMessage = async (inputVal) => {
    let copy = [];
    //uploading all the files to firebase and fetching all the urls
    if (files) {
      for (let i in files) {
        let dataName = `${Date.now()}__${files[i].data.name}`;
        await storage.ref(`files/${dataName}`).put(files[i].data);
        let url = await storage.ref("files").child(dataName).getDownloadURL();
        copy[i] = { url: url, type: files[i].type };
      }
    }
    //uploading the message object
    await db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: inputVal,
        user: {
          name: user.displayName,
          photoUrl: user.photoURL,
        },

        timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        files: copy.length ? copy : null,
        reference_msg: refMessage,
      });

    //clearing typing
    db.collection("rooms")
      .doc(roomId)
      .update({
        typing: firebase.firestore.FieldValue.arrayRemove(user.displayName),
      });
    //Clearing all the inputs for further use

    setFiles(null);
    //setUrl();
    setRefmessage(null);
  };

  //Controller for attachments
  const onFileInput = (file) => {
    setFiles(file);
  };

  //controller for sending the typing status to backend
  const handleTyping = (e) => {
    if (e.target.value != "") {
      db.collection("rooms")
        .doc(roomId)
        .update({
          typing: firebase.firestore.FieldValue.arrayUnion(user.displayName),
        });
    } else {
      db.collection("rooms")
        .doc(roomId)
        .update({
          typing: firebase.firestore.FieldValue.arrayRemove(user.displayName),
        });
    }
  };

  //Controller for the refrence message
  const refMethod = (e, message) => {
    e.persist();
    setRefmessage(message);
  };

  //Rendering data
  return (
    <Chat
      typing={typing}
      roomName={roomName}
      messages={messages}
      name={user.displayName}
      refMethod={refMethod}
      onFileInput={onFileInput}
      handleTyping={handleTyping}
      sendMessage={sendMessage}
      refMessage={refMessage}
    />
  );
};

export default ChatRoom;
