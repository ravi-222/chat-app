import React from "react";

function Attachment({ type, file }) {
  let attachedFile;
  switch (type) {
    case 1:
      attachedFile = (
        <a target="_blank" href={file}>
          <img src={file} alt="Chat immage" />
        </a>
      );

      break;
    case 2:
      attachedFile = (
        <video width="400" height="240" controls>
          <source src={file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
      break;
    case 3:
      attachedFile = (
        <audio controls>
          <source src={file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
      break;
    default:
      break;
  }
  return attachedFile;
}

export default Attachment;
