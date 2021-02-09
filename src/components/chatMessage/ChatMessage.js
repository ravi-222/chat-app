import React, { useEffect, useState } from "react";
import { Message, MessageText } from "@livechat/ui-kit";

const ChatMessage = ({ message, uid }) => {
  const { text } = message;
  return (
    <Message>
      <MessageText>{text}</MessageText>
    </Message>
  );
};

export default ChatMessage;
