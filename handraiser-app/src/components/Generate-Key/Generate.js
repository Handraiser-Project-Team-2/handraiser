import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";

export const GenerateKey = props => {
  const { handleClose, open, handleAdd, handleOnChange, tabValue } = props;
  const { register, handleSubmit, errors, setError, clearError } = useForm();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Enter Email Address"}
        </DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit(handleAdd)}>
          <DialogContent>
            <TextField
              error={!!errors.email}
              name="email"
              label="Email"
              variant="outlined"
              onChange={e => {
                handleOnChange(e, tabValue);
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
            <Button
              type="submit"
              color="primary"
              disabled={!!errors.disableBtn}
            >
              Submit
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+(boom)*(.camp)+$/;
