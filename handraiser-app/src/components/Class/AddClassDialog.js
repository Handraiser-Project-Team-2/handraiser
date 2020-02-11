import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import teal from "@material-ui/core/colors/teal";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  span: {
    float: "right",
    marginBottom: theme.spacing(2)
  },
  title: {
    backgroundColor: teal[500],
    color: "white"
  },
  fab: {
    float: "right",
    backgroundColor: teal[500]
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function AddClassDialog({ token, fetchMentorClass }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setState(prevState => {
      return { ...prevState, class_title: "", class_description: "" };
    });
  };

  const [dateToday] = useState({ data: new Date().toLocaleDateString() });

  const [state, setState] = useState({
    token: token,
    class_title: "",
    class_description: "",
    class_status: "open"
  });

  const [text, setText] = useState({
    class_title: 0,
    class_description: 0
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    setText({
      ...text,
      [e.target.name]: e.target.value.length
    });
    console.log(text);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("token", token);
    axios({
      method: "post",
      url: `http://localhost:5000/api/mentor/classroom/add`,
      data: state
    })
      .then(data => {
        console.log(data);
        fetchMentorClass();
        handleClose();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Fab
        variant="extended"
        color="primary"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <AddCircleOutlineIcon className={classes.extendedIcon} />
        Create new class
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Create new Class
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* VISUAL ONLY */}
            <TextField
              margin="dense"
              label="Date"
              defaultValue={dateToday.data}
              style={{ float: "right" }}
              InputProps={{
                readOnly: true
              }}
            />
            {/* END */}

            <TextField
              autoFocus
              required
              margin="dense"
              label="Class Title"
              fullWidth
              name="class_title"
              defaultValue={state.class_title}
              onChange={e => handleChange(e)}
              inputProps={{
                maxLength: 25
              }}
            />

            <span className={classes.span}>{text.class_title}/25</span>

            <TextField
              required
              id="outlined-multiline-static"
              label="Class Description"
              multiline
              rows="4"
              variant="outlined"
              fullWidth
              name="class_description"
              defaultValue={state.class_description}
              onChange={e => handleChange(e)}
              inputProps={{
                maxLength: 60
              }}
            />

            <span style={{ float: "right" }}>{text.class_description}/60</span>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
