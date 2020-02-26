import React from "react";
import TextField from "@material-ui/core/TextField";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Picker } from "emoji-mart";
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InsertEmoticonIcon
              onClick={emojiActive}
              style={{ color: "grey", cursor: "pointer", float: "left" }}
            />
          </div>
        )
      }}
    />

    {emoji === true ? (
      <Picker
        onClick={addEmoji}
        showPreview={false}
        showSkinTones={false}
        title=""
        style={{ position: "absolute", bottom: 120, marginLeft: 270 }}
      />
    ) : null}
  </React.Fragment>
);

export default Input;
