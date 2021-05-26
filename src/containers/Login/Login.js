import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationGoogle,
  authenticationEmail,
} from "../../store/actions/auth";
import Spinner from "../../utilities/Spinners/Spinner";
import "./Login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  //this is for the popup google account signup
  const signInPopup = () => {
    dispatch(authenticationGoogle());
  };

  //this is for the manual email password sign in

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInWithEmail = (e) => {
    e.preventDefault();
    dispatch(authenticationEmail(email, password));
  };
  return (
    <div className="login">
      <div className="login__container">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Container className={classes.root} maxWidth="xs">
              <form onSubmit={signInWithEmail}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          size="small"
                          variant="outlined"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          size="small"
                          type="password"
                          variant="outlined"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      color="secondary"
                      fullWidth
                      type="submit"
                      variant="contained"
                    >
                      Log in
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
            {/* <form className="app__signup" onSubmit={signInWithEmail}>
              <Input
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
              />
              <Button type="submit">Sign in with Credentials</Button>
            </form> */}
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={signInPopup}
            >
              Sign In with google
            </Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Login;
