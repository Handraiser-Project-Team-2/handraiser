import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  email: {
    color: "white",
    "&:hover": {
      color: "#ffffAA"
    }
  }
}));

export default function FormDialog({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [classroomKey, setClassroomKey] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [classMembers, setClassMembers] = useState([]);

  useEffect(() => {
    getAdminEmail();
  }, []);

  const handleClickOpen = data => {
    setOpen(true);
    setClassroomKey(data.classroom_key);
    setClassName(data.class_title);
    if (data.class_id) {
      axios({
        method: "get",
        url: `/api/classes/members/${data.class_id}`
      })
        .then(res => {
          res.data.map(member => {
            classMembers.push(member.email);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [adminPass, setAdminPass] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const getAdminEmail = () => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: {
        token: sessionStorage.getItem("token")
      }
    })
      .then(res => {
        setAdminEmail(res.data.email);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirm = classMembers => {
    axios.post(`/api/sendClassCode`, {
      maillist: classMembers,
      classroom_key: classroomKey,
      adminEmail: adminEmail,
      adminPass: adminPass,
      class_title: className
    });
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={() => handleClickOpen(data)}
        className={classes.email}
      >
        <EmailIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Password Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Confirm Password for {adminEmail}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Password"
            type="password"
            fullWidth
            onChange={e => setAdminPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirm(classMembers)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
