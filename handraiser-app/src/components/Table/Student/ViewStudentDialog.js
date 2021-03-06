import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// COMPONENTS
import StudentTabs from "./StudentTabs";

const useStyles = makeStyles(theme => ({
  name: {
    "&:hover": {
      color: "blue",
      cursor: "pointer"
    }
  }
}));
export default function ViewStudentDialog({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [profileData, setProfileData] = useState([]);
  const handleClickOpen = data => {
    setOpen(true);
    fetchProfileData();
    fetchStudentClass(data);
  };
  const fetchProfileData = () => {
    axios({
      method: "post",
      url: `/api/userprofile/student/`,
      data: { email: data.email }
    })
      .then(data => {
        setProfileData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [classData, setClassData] = useState([]);
  const fetchStudentClass = data => {
    axios({
      method: "post",
      url: `/api/student/get/class/${data.user_id}`,
      data: { email: data.email }
    })
      .then(data => {
        setClassData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography
        variant="body2"
        gutterBottom
        onClick={() => handleClickOpen(data)}
        className={classes.name}
      >
        {data.first_name + " " + data.last_name}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          {/* Students TABS */}
          <StudentTabs profileData={profileData} classData={classData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
