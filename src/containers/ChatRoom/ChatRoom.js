import { Avatar, IconButton, Button, Icon } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Message,
  Mic,
  MoreVert,
  Send,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ChatRoom.css";
import db, { storage } from "../../config";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";
import Chat from "../../components/Chat/Chat";

function ChatRoom() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [fileType, setFileType] = useState();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState();

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

  const sendMessage = (e) => {
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
                name: user.email,
                type: fileType,
              });
            });
        }
      );
    } else {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        type: 0,
      });
    }
    setData(null);
    setInput("");
    setFileType();
  };
  const onFileInput = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      if (e.target.files[0].type.includes("image")) {
        setFileType(1);
      } else if (e.target.files[0].type.includes("video")) {
        setFileType(2);
      }
      setData(e.target.files[0]);
    } else {
      setData(null);
    }
  };
  const onFileUpload = () => inputReference.current.click();

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        </div>
      </div>
      <Chat messages={messages} email={user.email} />
      <div className="chat__footer">
        <InsertEmoticon />
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
        <input type="file" ref={inputReference} onChange={onFileInput} hidden />

        <IconButton onClick={onFileUpload}>
          <AttachFile />
        </IconButton>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatRoom;
