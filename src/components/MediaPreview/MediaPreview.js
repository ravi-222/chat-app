import React from "react";
import "./MediaPreview.css";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

function MediaPreview({ open, handleClose, files }) {
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
      <div className="previewPaper"> Please work</div>
    </Modal>
  );
}

export default MediaPreview;
