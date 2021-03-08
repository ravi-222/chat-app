import { IconButton } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import React from "react";
import Attachment from "../attachment/Attachment";
import "./Message.css";

const Message = ({ message, type, name, refMethod }) => {
  const refMessageSetter = () => {
    const msg = { name: message.name, message: message.message };
    refMethod(msg);
  };
  return (
    <div className={`message ${message.name === name && "message__sender"} `}>
      <div
        className={`message__avatar ${
          message.name === name && "message__avatar__sender"
        }`}
      >
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
        {/* <span className="message__content__name">{message.name}</span> */}
        <div className="message__content__file">
          {message.file && <Attachment type={type} file={message.file} />}
        </div>
        {message.reference_msg && (
          <div className="message__content__reference">
            {/*  <div className="message__content__reference__name">
              {message.reference_msg.name}
            </div> */}
            <div>{message.reference_msg.message}</div>
          </div>
        )}
        <div className="message__content__text">{message.message}</div>
        <div
          className={`message__content__timestamp ${
            message.name === name && "message__content__timestamp__sender"
          }`}
        >
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </div>
      </div>
      <div className={`message__button`}>
        <IconButton size="small" onClick={refMessageSetter}>
          <Reply fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default Message;
