import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({ concernDescription, sendMessage, setconcernDescription}) => (
  <React.Fragment>
    <TextField
      id="outlined-textarea"
      multiline
      variant="outlined"
      fullWidth
      rows="3"
      value={concernDescription}
      onChange={event => setconcernDescription(event.target.value)}
      onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
    />
  </React.Fragment>
);

export default Input;