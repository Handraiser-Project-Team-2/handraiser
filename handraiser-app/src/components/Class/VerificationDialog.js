import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        "-",
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        "-",
        /[A-Za-z0-9]/
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default function VerificationDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [input, setInput] = useState("");
  const handleChange = e => {
    setInput(e.target.value);
    if (e.target.value.length === 13) {
      setValid(null);
    }
  };

  const [valid, setValid] = useState(null);
  const handleSubmit = () => {
    if (/\s/.test(input) || input === ``) {
      setValid(true);
    } else {
      handleClose();
      setInput('')
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Are you a Mentor?</DialogTitle>
        {/* ALERT */}
        {valid ? <Alert severity="error">Error! Invalid input</Alert> : null}
        <DialogContent>
          <DialogContentText>
            To access this site, please enter your verification key provided by
            your administrator.
          </DialogContentText>
          <InputLabel htmlFor="formatted-text-mask-input">
            Verification Code
          </InputLabel>
          <Input
            value={input}
            onChange={e => handleChange(e)}
            inputComponent={TextMaskCustom}
            fullWidth
            autoFocus
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
