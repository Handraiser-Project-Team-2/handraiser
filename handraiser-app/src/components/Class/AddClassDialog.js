import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import teal from "@material-ui/core/colors/teal";
import Collapse from "@material-ui/core/Collapse";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

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
    backgroundColor: "white",
    color: "#372476"
  },
  cont: {
    backgroundColor: "white",
    borderRadius: "30px",
    "@media (max-width: 665px)": {
      backgroundColor: "#372476",
      float: "right"
    }
  },
  text: {
    padding: "10px",
    color: "#372476",
    "@media (max-width: 665px)": {
      display: "none"
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  };

  const [add, setAdd] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `/api/mentor/classroom/add`,
      data: state
    })
      .then(data => {
        fetchMentorClass();
        handleClose();
        setAdd(true);
        setTimeout(() => {
          setAdd(false);
        }, 1500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Collapse in={add}>
        <Alert
          className={classes.alert}
          severity="success"
          onClose={() => {
            setAdd(false);
          }}
        >
          Class Added!
        </Alert>
      </Collapse>
      <div>
        <div className={classes.cont}>
          <Fab className={classes.fab} onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
          <span className={classes.text}>Add a class</span>
        </div>

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

              <span style={{ float: "right" }}>
                {text.class_description}/60
              </span>
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
    </React.Fragment>
  );
}
