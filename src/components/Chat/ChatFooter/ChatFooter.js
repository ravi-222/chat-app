import { IconButton } from "@material-ui/core";
import { AttachFile, Cancel, Send } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import Attachment from "../../Attachment/Attachment";
import { Fragment } from "react";

import "./ChatFooter.css";
const ChatFooter = ({
  refMessage,
  onFileInput,
  handleTyping,
  sendMessage,
  refMethod,
}) => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const inputReference = useRef();

  //clearing all inputs
  const clearInput = () => {
    setInput("");
    setFile(null);
    inputReference.current.value = "";
  };

  //controller for typing
  const handleInputChange = (e) => {
    setInput(e.target.value);
    handleTyping(e);
  };

  //controller for message submit
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    clearInput();
    console.log("send");
  };

  //controller for file submit
  const handlefileSubmit = (e) => {
    let tempFile = {};
    setFile(null);
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        let data = e.target.files[i];
        let url = URL.createObjectURL(e.target.files[i]);
        if (e.target.files[i].type.includes("image")) {
          tempFile[i] = {
            data: data,
            localUrl: url,
            type: 1,
          };
        } else if (e.target.files[i].type.includes("video")) {
          tempFile[i] = {
            data: data,
            localUrl: url,
            type: 2,
          };
        } else if (e.target.files[i].type.includes("audio")) {
          tempFile[i] = {
            data: data,
            localUrl: url,
            type: 3,
          };
        }
      }
      setFile(tempFile);
      onFileInput(tempFile);
      console.log("file uploaded");
    }
  };

  return (
    <Fragment>
      {refMessage && (
        <div className="chat__refmessage">
          <IconButton onClick={(e) => refMethod(e, null)}>
            <Cancel />
          </IconButton>
          <div className="chat__refmessage__preview">
            <Attachment
              type={refMessage.file ? refMessage.file.type : 0}
              file={refMessage.file ? refMessage.file.url : refMessage.message}
            />
          </div>
        </div>
      )}
      <div className="chat__footer">
        <IconButton component="label" htmlFor="attachemtUpload">
          <input
            name="attachemtUpload"
            id="attachemtUpload"
            type="file"
            multiple
            ref={inputReference}
            onChange={handlefileSubmit}
            hidden
          />
          <AttachFile />
        </IconButton>
        {/* <IconButton onClick={openPreview} component="label">
          <AttachFile style={{ color: "red" }} />
        </IconButton>
        <MediaPreview open={preview} handleClose={closePreview} /> */}
        <form>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message"
            type="text"
          />
          <IconButton
            type="submit"
            disabled={file || input ? false : true}
            onClick={handleSubmit}
            style={{ backgroundColor: "#9e3391", margin: "2px" }}
          >
            <Send style={{ color: "white" }} />
          </IconButton>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatFooter;
