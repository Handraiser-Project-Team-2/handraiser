import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({ concernDescription, sendMessage, setconcernDescription }) => (
  <React.Fragment>
    <TextField
      id="outlined-textarea"
      multiline
      variant="outlined"
      fullWidth
      rows="2"
      value={concernDescription}
      onChange={event => setconcernDescription(event.target.value)}
      onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
      style={{
        backgroundColor: "white"
      }}
    />
  </React.Fragment>
);

export default Input;
