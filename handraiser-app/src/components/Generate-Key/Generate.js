import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export const GenerateKey = props => {
  const {
    handleClose,
    open,
    handleMentor,
    setMentorData,
    handleAdmin,
    setAdminData,
    tabValue
  } = props;
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
        {tabValue === 1 ? (
          <form autoComplete="off" onSubmit={handleMentor}>
            <DialogContent>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                required
                onChange={e => setMentorData(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </form>
        ) : (
          <form autoComplete="off" onSubmit={handleAdmin}>
            <DialogContent>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                required
                onChange={e => setAdminData(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </div>
  );
};
