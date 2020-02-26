import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// COMPONENTS
import ClassMembers from "./ClassMembers";

const useStyles = makeStyles(theme => ({
  class: {
    "&:hover": {
      color: "blue",
      cursor: "pointer"
    }
  }
}));

export default function ViewMentorDialog({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [classData, setClassData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
    fetchClassData();
  };
  const fetchClassData = () => {
    axios({
      method: "get",
      url: `/api/classes/members/${data.class_id}`
    })
      .then(res => {
        setClassData(res.data);
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
        className={classes.class}
      >
        {data.class_title}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogContent style={{ backgroundColor: "whitesmoke" }}>
          <ClassMembers classData={classData} />
        </DialogContent>
        <DialogActions style={{ backgroundColor: "whitesmoke" }}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
