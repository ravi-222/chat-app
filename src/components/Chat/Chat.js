import React, { useRef, useEffect } from "react";
import "./Chat.css";
import Message from "../Message/Message";

function Chat({ messages, name }) {
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="chat__body">
      {messages.map((message) => (
        <Message message={message} type={message.type} name={name} />
      ))}
      <span ref={dummy}></span>
    </div>
  );
}

export default Chat;
