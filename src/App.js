import React from "react";
import "./App.css";
import Sidebar from "./containers/Sidebar/Sidebar";
import ChatRoom from "./containers/ChatRoom/ChatRoom";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./containers/Login/Login";
import { useSelector } from "react-redux";
function App() {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Route path="/rooms/:roomId" component={ChatRoom} />
        </div>
      )}
    </div>
  );
}

export default App;
