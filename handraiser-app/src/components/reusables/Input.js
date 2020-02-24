import React from "react";
import TextField from "@material-ui/core/TextField";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
const Input = ({ message, sendMessage, setMessage }) => (
  <React.Fragment>
    <TextField
      id="outlined-textarea"
      multiline
      variant="outlined"
      fullWidth
      rows="2"
      value={message}
      onChange={event => setMessage(event.target.value)}
      onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
      style={{
        backgroundColor: "white"
      }}
      InputProps={{
        endAdornment: <InsertEmoticonIcon style={{ color: "grey" ,cursor:"pointer"}} />
      }}
    />
  </React.Fragment>
);

export default Input;
