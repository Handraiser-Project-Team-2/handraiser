import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import red from "@material-ui/core/colors/red";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: red[500],
    color: "white"
  }
}));

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
        "-",
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/
      ]}
      placeholderChar={"\u2000"}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default function VerificationDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

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
      //given a space or empty then
      setValid(true); //if true error
    } else {
      // for valid input
      checkKey();
      setInput("");
    }
  };

  const checkKey = () => {
    axios({
      method: `post`,
      url: ` /api/admin/verify`,
      data: { token: sessionStorage.getItem("token"), supplied_key: input }
    })
      .then(data => {
        // if successful close dialog and return success response
        if (data.data.result === "Validation succesful") {
          handleClose();
          props.changeUserType(data);
          props.fetchMentorClass();
          props.fetchUserData();
        }
      })
      .catch(err => {
        if (err.response.data.result === "Invalid key supplied") setValid(true); //if true error
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Authentication required
        </DialogTitle>

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
        {/* ALERT */}
        {valid ? <Alert severity="error">Error! Invalid input</Alert> : null}
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
