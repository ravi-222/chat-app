import React, { Fragment } from "react";
import "./ChatHeader.css";
const ChatHeader = ({ roomName, typing }) => {
  //Previweing the typing
  const typingItems = [];
  for (let i in typing) {
    typingItems.push(<span>{typing[i]}, </span>);
  }
  return (
    <Fragment>
      <div className="chat__header">
        <h2>{roomName}</h2>
        {typing.length == 0 ? null : <p>{typingItems}is typing.</p>}
      </div>
    </Fragment>
  );
};

export default ChatHeader;
