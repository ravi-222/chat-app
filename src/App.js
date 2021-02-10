import React, { useRef, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Route path="/rooms/:roomId" component={Chat} />
        </div>
      )}
    </div>
  );
}

export default App;
