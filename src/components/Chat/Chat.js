import React, { useRef, useEffect, Fragment } from "react";
import Message from "../Message/Message";
import "./Chat.css";

function Chat({ messages, name, refMethod }) {
  const dummy = useRef();

  useEffect(() => {
    return () => {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    };
  }, [messages]);

  return (
    <Fragment>
      <div className="chat__body">
        {messages.map((message) => (
          <Message
            message={message}
            type={message.type}
            name={name}
            refMethod={refMethod}
          />
        ))}
        <span ref={dummy}></span>
      </div>
    </Fragment>
  );
}

export default Chat;
