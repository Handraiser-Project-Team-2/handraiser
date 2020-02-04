import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import axios from "axios";


import io from "socket.io-client";
// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";


// COMPONENTS
import CardPage from "./CardPage";
import FindClassDialog from "./FindClassDialog";
import VerificationDialog from "./VerificationDialog";

import AddClassDialog from "./AddClassDialog";
import Topbar from "../reusables/Topbar";

const useStyles = makeStyles(theme => ({
  fab: {
    float: "right"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  gridContainer: {
    paddingTop: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
let socket;
export default function ClassLanding() {
  let token = sessionStorage.getItem("token").split(" ")[1];
  const classes = useStyles();


  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(socket);
  }, []);
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    fetchUserData();
    fetchMentorClass();

    axios.post({
      method: "post",
      url: `/api/my/classes`,
      data: { token: sessionStorage.getItem("token").split(" ")[1] }
    }).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }, []);

  const [tokState] = useState({ token: token });
  const [data, setData] = useState([]);
  const fetchUserData = () => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: tokState
    })
      .then(data => {
        console.log(data);
        setData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [classData, setClassData] = useState([]);
  const fetchMentorClass = () => {
    axios({
      method: "post",
      url: `/api/my/classes`,
      data: tokState
    })
      .then(data => {
        console.log(data.data);
        setClassData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Topbar />

      {/* BODY */}
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <VerificationDialog />
            <Grid item xs={12}>
              <AddClassDialog
                token={token}
                fetchMentorClass={fetchMentorClass}
              />
              <FindClassDialog />
            </Grid>

            <Container maxWidth="lg" className={classes.flexy}>
              <CardPage classData={classData} data={data} />
            </Container>
          </Grid>
        </div>
      </Container>
      {/* END BODY */}
    </React.Fragment>
  );
}
