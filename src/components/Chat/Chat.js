import React, { useRef, useState } from "react";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";
import ChatHeader from "./ChatHeader/ChatHeader";
import "./Chat.css";
import MediaPreview from "../MediaPreview/MediaPreview";
import Eqdialog from "../EqDialog/EqDialog";

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
  const [eqFlag, setEqFlag] = useState(false);
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
      {eqFlag && (
        <Eqdialog open={eqFlag} handleClose={() => setEqFlag(false)} />
      )}
      <ChatBody messages={messages} name={name} refMethod={refMethod} />
      <ChatFooter
        fileReference={fileReference}
        onFileInput={setFiles}
        handleTyping={handleTyping}
        sendMessage={sendMessage}
        refMessage={refMessage}
        refMethod={refMethod}
        openEq={() => setEqFlag(true)}
      />
    </div>
  );
};

export default Chat;
