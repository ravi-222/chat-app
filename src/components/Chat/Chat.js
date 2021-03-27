import React, { useRef, useState } from "react";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";
import ChatHeader from "./ChatHeader/ChatHeader";
import "./Chat.css";
import MediaPreview from "../MediaPreview/MediaPreview";

const Chat = ({
  typing,
  roomName,
  messages,
  name,
  refMethod,
  onFileInput,
  handleTyping,
  sendMessage,
  refMessage,
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const fileReference = useRef();
  //for sending the files to the mediaPriview and the chatRoom component
  const setFiles = (files) => {
    setOpen(true);
    setFile(files);
    onFileInput(files);
  };
  const modalClose = () => {
    setOpen(false);
    setFile(null);
    onFileInput({});
    fileReference.current.value = "";
  };

  return (
    <div className="chat">
      <ChatHeader typing={typing} roomName={roomName} />
      {file && open && (
        <MediaPreview
          open={open}
          handleClose={modalClose}
          files={file}
          handleTyping={handleTyping}
          sendMessage={sendMessage}
        />
      )}
      <ChatBody messages={messages} name={name} refMethod={refMethod} />
      <ChatFooter
        fileReference={fileReference}
        onFileInput={setFiles}
        handleTyping={handleTyping}
        sendMessage={sendMessage}
        refMessage={refMessage}
        refMethod={refMethod}
      />
    </div>
  );
};

export default Chat;
