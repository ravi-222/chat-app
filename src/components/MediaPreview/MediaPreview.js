import React, { useState } from "react";
import "./MediaPreview.css";
import { Modal, IconButton } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { Send } from "@material-ui/icons";
import Attachment from "../Attachment/Attachment";

function MediaPreview({ open, handleClose, files, handleTyping, sendMessage }) {
  const [input, setInput] = useState("");
  console.log(files);
  const handleInputChange = (e) => {
    setInput(e.target.value);
    handleTyping(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
    handleClose();
  };
  let res = [];
  if (files) {
    Object.keys(files).map((i) => {
      res.push(
        <Attachment file={files[i]["localUrl"]} type={files[i]["type"]} />
      );
    });
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className="previewModal"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="previewPaper">
        {res}
        <form>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message"
            type="text"
          />
          <IconButton
            type="submit"
            disabled={files || input ? false : true}
            onClick={handleSubmit}
            style={{ backgroundColor: "#9e3391", margin: "2px" }}
          >
            <Send style={{ color: "white" }} />
          </IconButton>
        </form>
      </div>
    </Modal>
  );
}

export default MediaPreview;
