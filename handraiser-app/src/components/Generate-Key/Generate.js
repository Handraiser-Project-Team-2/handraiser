import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm } from "react-hook-form";

export const GenerateKey = props => {
  const {
    handleClose,
    open,
    handleSelect,
    handleAdd,
    handleOnChange,
    type
  } = props;
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
            <FormControl style={{ width: "120px" }} variant="outlined">
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={type}
                onChange={handleSelect}
              >
                <MenuItem value="">
                  <em>Select a Position</em>
                </MenuItem>
                <MenuItem value="mentor">Mentor</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>{" "}
            <TextField
              error={!!errors.email}
              name="email"
              label="Email"
              variant="outlined"
              onChange={e => {
                handleOnChange(e);
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

const emailRegex = /^(([^<>(),;:\s@]+([^<>(),;:\s@]+)*)|(.+))@(([^<>()[,;:\s@]+)+[^<>()[.,;:\s@]{2,})$/i;
