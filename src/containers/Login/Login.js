import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import "./Login.css";
import { auth, provider } from "../../config";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();

  //this is for the popup google account signup
  const signIn = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  //this is for the manual email password sign in
  /* const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  }; */
  return (
    <div className="login">
      <div className="login__container">
        <form className="app__signup">
          {/* <Input
            placeholder="email"
            fullWidth={true}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            fullWidth={true}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />*/}
          <Button onClick={signIn}>Sign In</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
