import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Message,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db, { storage } from "../../config";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [file, setFile] = useState("");
  const dummy = useRef();
  const inputReference = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView();
  }, [messages]);

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
    if (file) {
      const uploadTask = storage.ref(`files/${file.name}`).put(file);
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
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("rooms").doc(roomId).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                file: url,
                message: input,
                name: user.email,
              });
            });
        }
      );
    } else {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setFile({});
    setInput("");
  };
  const onFileInput = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const onFileUpload = () => inputReference.current.click();

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.email && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.file && (
              <video width="320" height="240" controls>
                <source src={message.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {message.message}
            <div className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </div>
          </p>
        ))}
        <span ref={dummy}></span>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send Message
          </button>
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

export default Chat;
