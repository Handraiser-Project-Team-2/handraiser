import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import indigo from "@material-ui/core/colors/indigo";
import axios from "axios";
import { useHistory } from "react-router-dom";
import teal from "@material-ui/core/colors/teal";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: indigo[500],
    color: "white"
  },
  fab: {
    backgroundColor: "white",
    color: "#372476"
  },
  cont: {
    backgroundColor: "white",
    borderRadius: "30px"
  },
  text: {
    padding: "10px",
    color: "#372476",
    "@media (max-width: 665px)": {
      display: "none"
    }
  }
}));

export default function ResponsiveDialog(props) {
  let history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValid(null);
  };

  const [input, setInput] = useState("");
  const handleInput = e => {
    setInput(e.target.value);
  };

  const [valid, setValid] = useState(null);

  const handleSubmit = () => {
    if (input === ``) {
      setValid(true); //show error
    } else {
      registerToClass();
    }
  };

  // here
  const registerToClass = () => {
    axios({
      method: "post",
      url: "/api/student/class/register",
      data: { token: sessionStorage.getItem("token"), supplied_key: input }
    })
      .then(data => {
        console.log(data.data.message);
        if (data.data.message === "Subject is now closed") {
          // handleClose();
          setValid(true);
        } else {
          handleClose();
          history.push(`/student/${data.data.class_id}`);
        }
      })
      .catch(err => {
        console.log(err);
        setValid(true); //show error
      });
  };

  return (
    <div>
      <div className={classes.cont}>
        <Fab className={classes.fab} onClick={handleClickOpen}>
          <SearchIcon />
        </Fab>
        <span className={classes.text}>Register to a class</span>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {"Enter a new Class"}
        </DialogTitle>
        {/* ALERT */}
        {valid ? <Alert severity="error">Registration Failed</Alert> : null}
        <DialogContent>
          <DialogContentText>
            Please enter the class code given by your mentor.
          </DialogContentText>

          <TextField
            required
            fullWidth
            autoFocus
            label="Class Code"
            variant="outlined"
            defaultValue={input}
            onChange={e => handleInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
