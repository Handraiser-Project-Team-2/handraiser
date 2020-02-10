import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: blueGrey[500],
    color: "white"
  },
  span: {
    float: "right",
    marginBottom: theme.spacing(2)
  }
}));

export default function EditClassDialog({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      class_title: "",
      class_description: ""
    });
    setText({
      class_title: data.class_title.length,
      class_description: data.class_description.length
    })
  };

  const [state, setState] = useState({
    class_title: data.class_title,
    class_description: data.class_description
  });
  const [text, setText] = useState({
    class_title: data.class_title.length,
    class_description: data.class_description.length
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    setText({
      ...text,
      [e.target.name]: e.target.value.length
    })
    console.log(text)
  };

  
  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Edit Class details
        </DialogTitle>
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
          />
          <span className={classes.span}>{text.class_title}/20</span>

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
          />
          <span className={classes.span}>{text.class_description}/20</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
