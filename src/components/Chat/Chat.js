import React, { Fragment } from "react";
import ChatBody from "./ChatBody/ChatBody";
import ChatFooter from "./ChatFooter/ChatFooter";
import ChatHeader from "./ChatHeader/ChatHeader";
import "./Chat.css";

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
  return (
    <div className="chat">
      <ChatHeader typing={typing} roomName={roomName} />
      <ChatBody messages={messages} name={name} refMethod={refMethod} />
      <ChatFooter
        onFileInput={onFileInput}
        handleTyping={handleTyping}
        sendMessage={sendMessage}
        refMessage={refMessage}
        refMethod={refMethod}
      />
    </div>
  );
};

export default Chat;
