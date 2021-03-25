import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../Store/actions/auth";
import Spinner from "../../utilities/Spinners/Spinner";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  //this is for the popup google account signup
  const signIn = () => {
    dispatch(authentication());
  };

  //this is for the manual email password sign in
  /* 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
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
        {loading ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Login;
