import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Message,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://avatars.dicebear.com/api/human/3.svg" />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className={`chat__message ${true && "chat__reciever"}`}>
          <span className="chat__name">blbla</span>
          Good Morning Sexy!
          <span className="chat__timestamp">04:20</span>
        </p>
        <p className="chat__message">Good Morning Hottie!</p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send Message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
