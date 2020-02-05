import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// COMPONENTS
import MentorTabs from "./MentorTabs";

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: `/api/userprofile/`,
      data: { email: data.validation_email }
    })
      .then(data => {
        console.log(data.data);
        setProfileData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="body2"
        gutterBottom
        onClick={handleClickOpen}
        className={classes.email}
      >
        {data.validation_email}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          {/* MENTOR TABS */}
          <MentorTabs profileData={profileData} />
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
