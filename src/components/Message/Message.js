import { IconButton } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import React from "react";
import Attachment from "../attachment/Attachment";
import "./Message.css";

const Message = ({ message, type, email }) => {
  return (
    <div className="chat__message">
      <p
        className={`chat__message__content ${
          message.name === email && "chat__sender"
        }`}
      >
        <span className="message__name">{message.name}</span>
        <div>
          {message.file && <Attachment type={type} file={message.file} />}
        </div>
        <div className="message__text">{message.message}</div>
        <div className="message__timestamp">
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </div>
      </p>
      {/*  <IconButton disableRipple={true} size="small">
        <Reply fontSize="small" />
      </IconButton> */}
    </div>
  );
};

export default Message;
