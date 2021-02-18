import { Avatar, IconButton, Button, Icon } from "@material-ui/core";
import {
  AttachFile,
  Cancel,
  InsertEmoticon,
  Message,
  Mic,
  MoreVert,
  Send,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import "./ChatRoom.css";
import db, { storage } from "../../config";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";
import Chat from "../../components/Chat/Chat";
import Attachment from "../../components/attachment/Attachment";

function ChatRoom() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [fileType, setFileType] = useState();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState();
  const [url, setUrl] = useState();

  const inputReference = useRef();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
          db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
              setMessages(snapshot.docs.map((doc) => doc.data()));
            });
        });
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (data) {
      let dataName = `${Math.floor(Math.random() * 5000)}__${data.name}`;
      const uploadTask = storage.ref(`files/${dataName}`).put(data);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("files")
            .child(dataName)
            .getDownloadURL()
            .then((url) => {
              db.collection("rooms").doc(roomId).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                file: url,
                message: input,
                name: user.displayName,
                type: fileType,
                photoUrl: user.photoURL,
              });
              setData();
              setInput("");
              setFileType();
              setUrl();
              inputReference.current.value = "";
            });
        }
      );
    } else {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        type: 0,
        photoUrl: user.photoURL,
      });
    }
    setData();
    setInput("");
    setFileType();
    setUrl();
    inputReference.current.value = "";
  };
  const onFileInput = (e) => {
    console.log("after ref click");
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      if (e.target.files[0].type.includes("image")) {
        setFileType(1);
      } else if (e.target.files[0].type.includes("video")) {
        setFileType(2);
      } else if (e.target.files[0].type.includes("audio")) {
        setFileType(3);
      }
      setUrl(URL.createObjectURL(e.target.files[0]));
      setData(e.target.files[0]);
    } else {
      setUrl();
      setData(null);
      inputReference.current.value = "";
    }
  };

  const removeAttachment = () => {
    setUrl();
    setData();
    setFileType();
    inputReference.current.value = "";
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h2>{roomName}</h2>
        <p>typing</p>
      </div>
      <Chat messages={messages} name={user.displayName} />
      {url && (
        <div className="chat__file">
          <IconButton onClick={removeAttachment}>
            <Cancel />
          </IconButton>
          <div className="chat__file__preview">
            <Attachment type={fileType} file={url} />
          </div>
        </div>
      )}
      <div className="chat__footer">
        <IconButton component="label" htmlFor="attachemtUpload">
          <input
            name="attachemtUpload"
            id="attachemtUpload"
            type="file"
            ref={inputReference}
            onChange={onFileInput}
            hidden
          />
          <AttachFile />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <IconButton
            type="submit"
            disabled={data || input ? false : true}
            onClick={sendMessage}
          >
            <Send />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
