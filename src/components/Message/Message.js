import { IconButton } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import React from "react";
import Attachment from "../attachment/Attachment";
import "./Message.css";

const Message = ({ message, type, name }) => {
  return (
    <div className="chat__message">
      <p
        className={`chat__message__content ${
          message.name === name && "chat__sender"
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
      <div className="message__side">
        <img
          className="message__avatar"
          src={
            message.photoUrl ||
            "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <IconButton disableRipple={true} size="small">
          <Reply fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default Message;
