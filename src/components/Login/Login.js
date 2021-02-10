import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../../config";
function Login() {
  const signIn = () => {
    auth
      .signInWithRedirect(provider)
      .then((result) => console.log(result))
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <Button onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
}

export default Login;
