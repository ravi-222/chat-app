import { IconButton } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import React from "react";
import Attachment from "../attachment/Attachment";
import "./Message.css";

const Message = ({ message, type, name }) => {
  return (
    <div className={`message ${message.name === name && "message__sender"} `}>
      <div className={`message__avatar`}>
        <img
          src={
            message.photoUrl ||
            "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
      </div>
      <div
        className={`message__content ${
          message.name === name && "message__content__sender"
        }`}
      >
        <span className="message__content__name">{message.name}</span>
        <div className="message__content__file">
          {message.file && <Attachment type={type} file={message.file} />}
        </div>
        <div className="message__content__text">{message.message}</div>
        <div className="message__content__timestamp">
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </div>
      </div>
      <div className={`message__button`}>
        <IconButton size="small">
          <Reply fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default Message;
