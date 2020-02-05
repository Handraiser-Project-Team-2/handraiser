import React, { useState, useEffect, useContext } from "react";
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
    paddingTop: "100px"
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
export default function ClassLanding(props) {
  let token = sessionStorage.getItem("token").split(" ")[1];
  const classes = useStyles();
  const [verfication, setVerification] = useState(false);
  const [userType, setUserType] = useState();
  //here

  const changeUserType = e => {
    setUserType(e.data.user_type_id);
  };

  const checkValidations = () => {
    console.log(sessionStorage.getItem("token").split(" ")[1]);
    axios({
      method: "post",
      url: `/api/admin/check/designation`,
      data: { token: sessionStorage.getItem("token").split(" ")[1] }
    })
      .then(data => {
        setVerification(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserData();
    userType === 3 ? fetchMyClass() : fetchMentorClass();
    checkValidations();
  }, [userType]);

  const [tokState] = useState({ token: token });
  const [data, setData] = useState([]);

  const fetchUserData = () => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: tokState
    })
      .then(data => {
        setData(data.data);
        changeUserType(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [classData, setClassData] = useState([]);

  // get all class relative to this mentor(if user is verified)
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

  const fetchMyClass = () => {
    axios({
      method: "post",
      url: `/api/student/get/class`,
      data: tokState
    })
      .then(data => {
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
            {verfication ? (
              <VerificationDialog changeUserType={changeUserType} />
            ) : (
              ""
            )}
            <Grid item xs={12}>
              {userType === 3 ? (
                <FindClassDialog />
              ) : (
                <AddClassDialog
                  token={token}
                  fetchMentorClass={fetchMentorClass}
                />
              )}
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
