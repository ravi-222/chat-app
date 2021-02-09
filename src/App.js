import React, { useRef, useState } from "react";
import { ThemeProvider } from "@livechat/ui-kit";
import ChatRoom from "./containers/ChatRoom/ChatRoom";
const theme = {
  vars: {
    "primary-color": "#427fe1",
    "secondary-color": "#fbfbfb",
    "tertiary-color": "#fff",
    "avatar-border-color": "blue",
  },
  AgentBar: {
    Avatar: {
      size: "42px",
    },
    css: {
      backgroundColor: "var(--secondary-color)",
      borderColor: "var(--avatar-border-color)",
    },
  },
  Message: {
    css: {
      fontWeight: "bold",
    },
  },
};

const App = () => {
  return (
    <ThemeProvider>
      <ChatRoom />
    </ThemeProvider>
  );
};

export default App;
