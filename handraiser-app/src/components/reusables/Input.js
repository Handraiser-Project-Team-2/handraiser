import React from "react";
import TextField from "@material-ui/core/TextField";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Picker } from "emoji-mart";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  span: {
    position: "relative",
    alignContent: "center",
    alignItems: "center"
  }
}));

const Input = ({
  message,
  sendMessage,
  setMessage,
  addEmoji,
  emoji,
  emojiActive,
  classes
}) => (
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
        endAdornment: (
          <InsertEmoticonIcon
            onClick={emojiActive}
            style={{ color: "grey", cursor: "pointer", float: "left" }}
          />
        )
      }}
    />
    <span className={classes.span}>
      {emoji === true ? <Picker onClick={addEmoji} title="" /> : null}
    </span>
  </React.Fragment>
);

export default Input;
