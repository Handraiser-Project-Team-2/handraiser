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
  email: {
    "&:hover": {
      color: "blue",
      cursor: "pointer"
    }
  }
}));

export default function ViewMentorDialog({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [profileData, setProfileData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
    fetchProfileData();
    fetchClass();
  };

  const fetchProfileData = () => {
    axios({
      method: "post",
      url: `/api/userprofile/`,
      data: { email: data.email }
    })
      .then(data => {
        console.log(data.data);
        setProfileData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [classData, setClassData] = useState([]);
  const fetchClass = () => {
    axios({
      method: "post",
      url: `/api/student/get/class`,
      data: { email: data.email }
    })
      .then(data => {
        console.log(data.data);
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
        onClick={handleClickOpen}
        className={classes.email}
      >
        {data.email}
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