import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export default function ResponsiveDialog({ toggleDialog, setToggleDialog }) {
  const { register, handleSubmit, errors, setError, clearError } = useForm();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState("");

  const handleClose = () => {
    setToggleDialog(false);
  };
  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmitEmail = e => {
    e.preventDefault();

    axios({
      method: "put",
      url: `/api/login/superadmin`,
      data: { email: text }
    })
      .then(data => {
        handleClose();
        setText("");
      })
      .catch(err => {
        console.log(err);
      });
  };
// HEHE
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={toggleDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Update Superadmin Email"}
        </DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmitEmail}>
          <DialogContent>
            <TextField
              error={!!errors.email}
              name="email"
              id="standard-basic"
              label="Superadmin Email"
              fullWidth
              required
              autoFocus
              defaultValue={text}
              onChange={e => {
                handleChange(e);
                if (!emailRegex.test(e.target.value)) {
                  setError("disableBtn", "notMatch", "disabled");
                  return setError("email", "notMatch", "Email must be valid!");
                }
                clearError("disableBtn");
                clearError("email");
              }}
              inputRef={register({
                required: "Email Address is required"
              })}
              helperText={errors.email ? errors.email.message : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={!!errors.disableBtn}
            >
              Set
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+(boom)*(.camp)+$/;
