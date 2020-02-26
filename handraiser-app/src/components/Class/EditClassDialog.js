import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: "#372476",
    color: "white"
  },
  span: {
    float: "right",
    marginBottom: theme.spacing(2)
  },
  edit: {
    color: "white",
    "&:hover": {
      color: "#ffffAA"
    }
  }
}));

export default function EditClassDialog({ data, fetchMentorClass }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [switchBtn, setSwitchBtn] = useState();

  const [state, setState] = useState();

  useEffect(() => {
    setState({
      class_id: data.class_id,
      class_title: data.class_title,
      class_description: data.class_description,
      class_status: data.class_status
    });

    setSwitchBtn(data.class_status === "open" ? false : true);

    return () => {
      setState();
      setSwitchBtn(false);
    };
  }, [data]);

  const handleSwitch = event => {
    event.persist();
    setSwitchBtn(event.target.checked);

    setState(prevState => {
      return {
        ...prevState,
        class_status: event.target.checked ? "closed" : "open"
      };
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [text, setText] = useState({
    class_title: data.class_title.length,
    class_description: data.class_description.length
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

  const handleClose = () => {
    setOpen(false);
    setState();
    setSwitchBtn(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios({
      method: "put",
      url: `/api/mentor/my/class`,
      data: state
    })
      .then(data => {
        fetchMentorClass();
        handleClose();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <EditIcon className={classes.edit} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Edit Class details
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Class Title"
              fullWidth
              name="class_title"
              defaultValue={data.class_title}
              onChange={e => handleChange(e)}
              style={{ marginTop: "2em" }}
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
              defaultValue={data.class_description}
              onChange={e => handleChange(e)}
              inputProps={{
                maxLength: 60
              }}
            />
            <span className={classes.span}>{text.class_description}/60</span>

            <span>Classroom is now {switchBtn ? "Closed" : "Open"}: </span>
            <Switch
              checked={switchBtn}
              onChange={e => handleSwitch(e)}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
