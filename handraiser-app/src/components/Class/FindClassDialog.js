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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  fab: {
    float: "right"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function ResponsiveDialog() {
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
    console.log(e.target.value);
  };

  const [valid, setValid] = useState(null);
  const handleSubmit = () => {
    if (input === ``) {
      setValid(true);
    }else{
      handleClose();
    }
  };

  return (
    <div>
      <Fab
        variant="extended"
        color="primary"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <SearchIcon className={classes.extendedIcon} />
        Find Class
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Enter a new Class"}
        </DialogTitle>
        {/* ALERT */}
        {valid ? <Alert severity="error">Error! Invalid input</Alert> : null}
        <DialogContent>
          <DialogContentText>
            Please enter the class code given by your mentor.
          </DialogContentText>

          <TextField
            required
            fullWidth
            autoFocus
            id="standard-required"
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
