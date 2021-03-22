import { Avatar, IconButton, Button, Icon } from "@material-ui/core";
import {
  AttachFile,
  Cancel,
  FlipSharp,
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
import MediaPreview from "../../components/MediaPreview/MediaPreview";

function ChatRoom() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [files, setFiles] = useState();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [url, setUrl] = useState();
  const [typing, setTyping] = useState([]);
  const [refMessage, setRefmessage] = useState(null);
  const [preview, setPreview] = useState(false);
  const inputReference = useRef();

  //useEffect for fetching the typing status
  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        setTyping(snapshot.data().typing);
      });
  }, [input]);

  //useEffect for fetching all the messages
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

  //for sending the message to firebase
  const sendMessage = async (e) => {
    e.preventDefault();
    let copy = [];
    if (files) {
      for (let i in files) {
        let dataName = `${Date.now()}__${files[i].data.name}`;
        await storage.ref(`files/${dataName}`).put(files[i].data);
        let url = await storage.ref("files").child(dataName).getDownloadURL();
        copy[i] = { url: url, type: files[i].type };
      }
    }

    await db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        photoUrl: user.photoURL,
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
    setInput("");
    setFiles(null);
    setUrl();
    setRefmessage(null);
    inputReference.current.value = "";
  };

  //Controller for attachments
  const onFileInput = (e) => {
    let fileO = {};
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        let data = e.target.files[i];
        let url = URL.createObjectURL(e.target.files[i]);
        if (e.target.files[i].type.includes("image")) {
          fileO[i] = {
            data: data,
            localUrl: url,
            type: 1,
          };
        } else if (e.target.files[i].type.includes("video")) {
          fileO[i] = {
            data: data,
            localUrl: url,
            type: 2,
          };
        } else if (e.target.files[i].type.includes("audio")) {
          fileO[i] = {
            data: data,
            localUrl: url,
            type: 3,
          };
        }
      }
      setFiles(fileO);
    } else {
      setFiles(null);
      inputReference.current.value = "";
    }
  };

  //controller for sending the typing status to backend
  const inputHandleChange = (e) => {
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
    setInput(e.target.value);
  };

  //controller for removal of attachemnt
  const removeAttachment = () => {
    setFiles(null);

    inputReference.current.value = "";
    setRefmessage(null);
  };

  //Controller for the refrence message attachment
  const refMessageMethod = (message) => {
    console.log(message);
    setRefmessage(message);
  };
  //Previweing the typing
  const typingItems = [];
  for (let i in typing) {
    typingItems.push(<span>{typing[i]}, </span>);
  }

  const openPreview = () => {
    setPreview(true);
  };

  const closePreview = () => {
    setPreview(false);
  };
  //Rendering data
  return (
    <div className="chat">
      <div className="chat__header">
        <h2>{roomName}</h2>
        {typing.length == 0 ? null : <p>{typingItems}is typing.</p>}
      </div>

      <Chat
        messages={messages}
        name={user.displayName}
        refMethod={refMessageMethod}
      />
      {url && (
        <div className="chat__file">
          <IconButton onClick={removeAttachment}>
            <Cancel />
          </IconButton>
          <div className="chat__file__preview">
            {/* <Attachment type={fileType} file={url} /> */}
          </div>
        </div>
      )}
      {refMessage && (
        <div className="chat__refmessage">
          <IconButton onClick={removeAttachment}>
            <Cancel />
          </IconButton>
          <div className="chat__refmessage__preview">
            <Attachment
              type={refMessage.file ? refMessage.file.type : 0}
              file={refMessage.file ? refMessage.file.url : refMessage.message}
            />
          </div>
        </div>
      )}
      <div className="chat__footer">
        <IconButton component="label" htmlFor="attachemtUpload">
          <input
            name="attachemtUpload"
            id="attachemtUpload"
            type="file"
            multiple
            ref={inputReference}
            onChange={onFileInput}
            hidden
          />
          <AttachFile />
        </IconButton>
        <IconButton onClick={openPreview} component="label">
          <AttachFile style={{ color: "red" }} />
        </IconButton>
        <MediaPreview open={preview} handleClose={closePreview} />
        <form>
          <input
            value={input}
            onChange={inputHandleChange}
            placeholder="Type a message"
            type="text"
          />
          <IconButton
            type="submit"
            disabled={files || input ? false : true}
            onClick={sendMessage}
            style={{ backgroundColor: "#9e3391", margin: "2px" }}
          >
            <Send style={{ color: "white" }} />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
