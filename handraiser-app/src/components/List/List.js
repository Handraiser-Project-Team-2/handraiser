import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import { ListCont } from "../Styles/Styles2";

export const UserList = () => {
  const [stud, setStud] = useState([]);
  const [men, setMen] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    handleStudentList();
    handleMentorList();
    handleClassList();
  }, []);

  const handleStudentList = () => {
    axios({
      method: "get",
      url: `/api/user/student_list`
    })
      .then(res => {
        setStud(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleMentorList = () => {
    axios({
      method: "get",
      url: `/api/user/mentor_list`
    })
      .then(res => {
        setMen(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleClassList = () => {
    axios({
      method: "get",
      url: `/api/classes`
    })
      .then(res => {
        setClasses(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <ListCont>
        <Grid
          item
          xs={12}
          sm={2}
          style={{
            backgroundColor: "white",
            marginLeft: "5px",
            textAlign: "center",
            border: "2px solid #372476",
            borderRadius: "20px"
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginTop: "10px", marginBottom: "-5px" }}
          >
            {classes.length}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Classes
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          style={{
            backgroundColor: "white",
            marginLeft: "5px",
            textAlign: "center",
            border: "2px solid #372476",
            borderRadius: "20px"
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginTop: "10px", marginBottom: "-5px" }}
          >
            {men.length}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Mentor
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          style={{
            backgroundColor: "white",
            textAlign: "center",
            border: "2px solid #372476",
            borderRadius: "20px"
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginTop: "10px", marginBottom: "-5px" }}
          >
            {stud.length}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Student
          </Typography>
        </Grid>
      </ListCont>
    </React.Fragment>
  );
};
