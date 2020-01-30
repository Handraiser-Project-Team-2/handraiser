import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export const GenerateKey = props => {
  const { handleClose, open } = props;
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
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Submit</Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
