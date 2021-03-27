import React, { useRef, useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { AttachFile, Cancel, Mic, Send, Stop } from "@material-ui/icons";
import Attachment from "../../Attachment/Attachment";
import { Fragment } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import "./ChatFooter.css";

//Recorder Setup
const Mp3Recorder = new MicRecorder({
  bitRate: 128,
});

const ChatFooter = ({
  fileReference,
  refMessage,
  onFileInput,
  handleTyping,
  sendMessage,
  refMethod,
}) => {
  const [input, setInput] = useState("");
  const [isfile, setIsFile] = useState(false);
  // const inputReference = useRef();
  const [isRecording, setIsRecording] = useState(false);

  const recordingHandler = () => {
    if (!isRecording) {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    } else {
      Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(buffer, "voiceRecording.mp3");
          const blobURL = URL.createObjectURL(blob);
          const obj = {
            0: {
              data: file,
              localUrl: blobURL,
              type: 3,
            },
          };
          console.log(obj);
          setIsFile(true);
          onFileInput(obj);
          setIsRecording(false);
        })
        .catch((e) => console.log(e));
    }
  };

  //clearing all inputs
  const clearInput = () => {
    setInput("");
    setIsFile(false);
    fileReference.current.value = "";
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
  };

  //controller for file submit
  const handlefileSubmit = (e) => {
    let tempFile = {};
    setIsFile(false);
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
      setIsFile(true);
      onFileInput(tempFile);
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
            ref={fileReference}
            onChange={handlefileSubmit}
            hidden
          />
          <AttachFile />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message"
            type="text"
          />
          {input ? (
            <IconButton
              type="submit"
              disabled={isfile || input ? false : true}
              onClick={handleSubmit}
              style={{ backgroundColor: "#9e3391", margin: "2px" }}
            >
              <Send style={{ color: "white" }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={recordingHandler}
              style={{ backgroundColor: "#9e3391", margin: "2px" }}
            >
              {!isRecording ? (
                <Mic style={{ color: "white" }} />
              ) : (
                <Stop style={{ color: "red" }} />
              )}
            </IconButton>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default ChatFooter;

/* import React, { useEffect, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import Button from "@material-ui/core/Button";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import Container from "@material-ui/core/Container";

const main = {
  marginBottom: "20px",
};
const record = {
  position: "relative",
  right: "60px",
  borderRadius: "50px",
};
const stop = {
  position: "relative",
  left: "60px",
  borderRadius: "50px",
};

const Mp3Recorder = new MicRecorder({
  bitRate: 64,
  prefix: "data:audio/wav;base64,",
});

const ChatFooter = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        const binaryString = btoa(blobURL);
        console.log(binaryString);
        setIsRecording(false);
        setBlobUrl(blobURL);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm" style={main}>
          <Button
            variant="contained"
            //style={record}
            color="primary"
            onClick={start}
            disabled={isRecording}
          >
            <MicIcon />
          </Button>
          <Button
            variant="contained"
            //style={stop}
            color="primary"
            onClick={stop}
            disabled={!isRecording}
          >
            <MicOffIcon />
          </Button>
        </Container>
        <audio src={blobUrl} controls="controls" />
      </header>
    </div>
  );
};

export default ChatFooter;
 */
