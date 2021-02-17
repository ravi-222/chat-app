import React, { useRef, useEffect } from "react";
import "./Chat.css";
import Message from "../Message/Message";

function Chat({ messages, email }) {
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="chat__body">
      {messages.map((message) => (
        <Message message={message} type={message.type} email={email} />
      ))}
      <span ref={dummy}></span>
    </div>
  );
}

export default Chat;
