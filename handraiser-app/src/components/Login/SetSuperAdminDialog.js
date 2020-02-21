import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export default function ResponsiveDialog({ toggleDialog, setToggleDialog }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState("");

  const handleClose = () => {
    setToggleDialog(false);
  };
  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
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
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              id="standard-basic"
              label="Superadmin Email"
              fullWidth
              required
              autoFocus
              defaultValue={text}
              onChange={e => handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Set
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
