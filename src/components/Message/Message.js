import { IconButton } from "@material-ui/core";
import { MessageSharp, Reply } from "@material-ui/icons";
import React from "react";
import { Fragment } from "react";
import Attachment from "../Attachment/Attachment";
import "./Message.css";

const Message = ({ message, name, refMethod }) => {
  const refMessageSetter = (e, file = null) => {
    e.persist();
    console.log(message);
    const msg = {
      name: message.user.name,
      message: message.message,
      file: file,
      timestamp: message.timestamp,
    };
    refMethod(e, msg);
  };
  const msgFiles = [];
  if (message.files) {
    for (let i = 0; i < message.files.length - 1; i++) {
      msgFiles.push(
        <div
          key={message.files[i].url}
          className={`message ${
            message.user.name === name && "message__sender"
          } `}
        >
          <div
            className={`message__avatar ${
              message.user.name === name && "message__avatar__sender"
            }`}
          >
            <img
              src={
                message.user.photoUrl ||
                "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
            />
          </div>
          <div
            className={`message__content ${
              message.user.name === name && "message__content__sender"
            }`}
          >
            <div className="message__content__file">
              <Attachment
                type={message.files[i].type}
                file={message.files[i].url}
              />
            </div>
            <div
              className={`message__content__timestamp ${
                message.user.name === name &&
                "message__content__timestamp__sender"
              }`}
            >
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </div>
          </div>
          <div className={`message__button`}>
            <IconButton
              size="small"
              onClick={(e) => refMessageSetter(e, message.files[i])}
            >
              <Reply fontSize="small" />
            </IconButton>
          </div>
        </div>
      );
    }
  }

  return (
    <Fragment>
      {msgFiles}
      <div
        className={`message ${
          message.user.name === name && "message__sender"
        } `}
      >
        <div
          className={`message__avatar ${
            message.user.name === name && "message__avatar__sender"
          }`}
        >
          <img
            src={
              message.user.photoUrl ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
        </div>
        <div
          className={`message__content ${
            message.user.name === name && "message__content__sender"
          }`}
        >
          {/* <span className="message__content__name">{message.name}</span> */}
          <div className="message__content__file">
            {message.files && (
              <Attachment
                type={message.files[message.files.length - 1].type}
                file={message.files[message.files.length - 1].url}
              />
            )}
          </div>
          {message.reference_msg && (
            <div className="message__content__reference">
              <div className="message__content__reference__name">
                {message.reference_msg.name}
              </div>
              <div>{message.reference_msg.message}</div>
              {message.reference_msg.file ? (
                <div className="message__content__reference__file">
                  <Attachment
                    type={message.reference_msg.file.type}
                    file={message.reference_msg.file.url}
                  />
                </div>
              ) : null}
            </div>
          )}
          <div className="message__content__text">{message.message}</div>
          <div
            className={`message__content__timestamp ${
              message.user.name === name &&
              "message__content__timestamp__sender"
            }`}
          >
            {new Date(message.timestamp?.toDate()).toUTCString()}
          </div>
        </div>
        <div className={`message__button`}>
          <IconButton
            size="small"
            onClick={
              message.files
                ? (e) =>
                    refMessageSetter(e, message.files[message.files.length - 1])
                : (e) => refMessageSetter(e)
            }
          >
            <Reply fontSize="small" />
          </IconButton>
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
