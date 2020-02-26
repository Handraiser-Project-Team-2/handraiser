import React, { useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";

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
  const [openAdd, setOpenAdd] = React.useState(false);

  const [classroomKey, setClassroomKey] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [emailTo, setEmailto] = React.useState("");
  const [classMembers, setClassMembers] = useState([]);

  const handleClickOpen = data => {
    if (
      emailTo !== "" &&
      /^[a-zA-Z0-9-.-_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailTo) === true
    ) {
      setErrorMsgEmail("");
      getAdminEmail();
      setOpenAdd(false);
      setOpen(true);
      setClassroomKey(data.classroom_key);
      setClassName(data.class_title);
    } else if (
      /^[a-zA-Z0-9-.-_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailTo) === false
    ) {
      setErrorMsgEmail("Invalid Email");
    }
  };

  const openAddEmail = data => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAdd(false);
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

  const handleConfirm = () => {
    if (data) {
      axios.post(`/api/sendClassCode`, {
        emailTo: emailTo,
        classroom_key: classroomKey,
        adminEmail: adminEmail,
        adminPass: adminPass,
        class_title: className
      });
      toast.success("Classroom Key sent to the student", {
        position: toast.POSITION.TOP_RIGHT
      });

      setOpen(false);
    }
  };

  const [errorMsgEmail, setErrorMsgEmail] = useState("");

  return (
    <div>
      <IconButton onClick={() => openAddEmail(data)} className={classes.email}>
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

      <Dialog
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Student Email</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Add Student Email.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Email"
            type="email"
            fullWidth
            onChange={e => setEmailto(e.target.value)}
            error={errorMsgEmail === "" ? false : true}
            helperText={errorMsgEmail ? errorMsgEmail : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClickOpen(data)} color="primary">
            Send Code
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={1500} />
    </div>
  );
}
