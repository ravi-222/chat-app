import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React from "react";
import "./Message.css";

const Message = ({ message, type, email }) => {
  let file;
  switch (type) {
    case 1:
      file = <img src={message.file} alt="Image" />;
      break;
    case 2:
      file = (
        <video width="320" height="240" controls>
          <source src={message.file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
      break;
    default:
      break;
  }

  return (
    <Card
      className={`chat__message ${message.name === email && "chat__reciever"}`}
    >
      <CardContent>
        <Typography
          classname="message__timestamp"
          variant="caption"
          color="textSecondary"
          component="p"
          align="right"
        >
          {message.name}
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        </Typography>
      </CardContent>
      <CardMedia classname="message_media" image={message.file && file} />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {message.message}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          align="right"
        >
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
