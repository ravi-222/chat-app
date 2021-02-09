import React, { Fragment } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Row, IconButton, SendIcon } from "@livechat/ui-kit";
import { db } from "../../config";
import ChatMessage from "../../components/chatMessage/ChatMessage";

const ChatRoom = () => {
  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <Fragment>
      {messages &&
        messages.map((msg) => (
          <ChatMessage key={msg.id} uid={msg.id} message={msg} />
        ))}
      <Row>
        <IconButton>
          <SendIcon />
        </IconButton>
      </Row>
    </Fragment>
  );
};

export default ChatRoom;
