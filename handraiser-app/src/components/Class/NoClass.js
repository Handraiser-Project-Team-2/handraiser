import React from "react";
import Avatar from "@material-ui/core/Avatar";

import ClassIcon from "../images/class_icon.png";
import Typography from "@material-ui/core/Typography";
import indigo from "@material-ui/core/colors/indigo";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  icon: {
    width: "100%",
    minHeight: 200
  },
  errorCont: {
    display: "flex",
    backgroundColor: indigo[50],
    color: "black"
  }
}));

export default function NoClass() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.errorCont}>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Avatar
            alt="Remy Sharp"
            variant="square"
            src={ClassIcon}
            className={classes.icon}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography variant="h2" gutterBottom style={{ color: "#5c8fb0" }}>
            Ooof!
          </Typography>
          <Typography variant="h6" gutterBottom style={{ color: "#466271" }}>
            You are not attending to any class yet.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
