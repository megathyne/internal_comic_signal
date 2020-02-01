import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "30vh"
  }
}));

export default function Login(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            onChange={props.handleChange("username")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            onChange={props.handleChange("password")}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
