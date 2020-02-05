import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Topbar from "../reusables/Topbar";

import {
  Div,
  Nav,
  Queue,
  Help,
  Subject,
  TitleName,
  Option,
  More,
  Conversation,
  Message,
  Field,
  Send,
  Div2,
  Shared,
  Request
} from "../Styles/Styles";
import axios from "axios";

import Tabs from "./Tabs/Tabs";
var jwtDecode = require("jwt-decode");

export default function Student() {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({ user_type: "" });
  const open = Boolean(anchorEl);
  const [concernDescription, setConcernDescription] = useState("");
  const [concernTitle, setConcernTitle] = useState("");
  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;
  const [name, setName] = useState("");

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendMsg = evt => {
    evt.preventDefault();
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("/api/user/data", {
          token: sessionStorage.getItem("token").split(" ")[1]
        })
        .then(data => {
          console.log(data);
          setState({ user_type: data.data.user_type_id });

          const user_type = data.data.user_type_id;

          console.log(user_type);

          if (user_type !== 3) {
            Swal.fire({
              icon: "error",
              title: "You cannot acces this page!"
            }).then(function() {
              if (user_type === 4) {
                history.push("/mentor");
              } else if (user_type === 1) {
                history.push("/superadmin");
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "You cannot acces this page!"
      }).then(function() {
        history.push("/");
      });
    }
  }, []);

  const sendRequest = () => {
    axios
      .post(`/api/student/request/assistance`, {
        class_id: 5,
        user_id: user_id,
        concern_title: concernTitle,
        concern_description: concernDescription
      })
      .then(() => {
        setConcernTitle("");
        setConcernDescription("");
        Swal.fire({
          icon: "success",
          title: "Request sent to the mentor"
        }).then(() => {
          history.push("/student");
        });
      });
  };

  if (state.user_type === 3) {
    return (
      <React.Fragment>
        <Topbar />
        <Div>
          <Queue>
            <Tabs />
          </Queue>
          <Help>
            <Subject>
              <TitleName>
                <TextField
                  id="standard-basic"
                  value={concernTitle}
                  onChange={e => setConcernTitle(e.target.value)}
                  style={{ width: 700 }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>Subject</Typography>
                  <Typography>{concernTitle.length}/30</Typography>
                </div>
              </TitleName>
              <Option>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%"
                  }}
                >
                  <More onClick={handleMenu}>
                    <MoreVertIcon
                      style={{
                        fontSize: 35,
                        color: "#c4c4c4"
                      }}
                    />
                  </More>
                </div>
              </Option>
            </Subject>
            <Conversation>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginRight: "15px",
                  padding: "10px",
                  flexDirection: "row-reverse"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                    alignItems: "flex-end"
                  }}
                >
                  <Avatar></Avatar>
                </div>

                <div
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "white",
                    maxWidth: "450px",
                    border: "1px solid lightgrey",
                    padding: "10px 20px 10px 20px",
                    borderRadius: "10px"
                  }}
                >
                  <span id="display">Hello</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginRight: "15px",
                  padding: "10px",
                  flexDirection: "row"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                    alignItems: "flex-end"
                  }}
                >
                  <Avatar></Avatar>
                </div>

                <div
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "white",
                    maxWidth: "450px",
                    border: "1px solid lightgrey",
                    padding: "10px 20px 10px 20px",
                    borderRadius: "10px"
                  }}
                >
                  <span>
                    Curry to Igoudala! Back to Curry! Igoudala with the layup...
                    OHHHH!!!! BLOCKED BY JAMES!!!
                  </span>
                </div>
              </div>
            </Conversation>
            <Message>
              <Field>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    width: "100%"
                  }}
                >
                  <form onSubmit={sendMsg}>
                    <TextField
                      id="outlined-textarea"
                      multiline
                      variant="outlined"
                      fullWidth
                      rows="3"
                      value={concernDescription}
                      onChange={e => setConcernDescription(e.target.value)}
                    />

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "15px"
                      }}
                    >
                      <Request onClick={sendRequest}>NEW REQUEST</Request>
                      <Send onClick={sendMsg}>SEND</Send>
                    </div>
                  </form>
                </div>
              </Field>
            </Message>
          </Help>
          <Div2>
            <Shared>
              <Typography variant="h6">Shared Files</Typography>
            </Shared>
          </Div2>
        </Div>
      </React.Fragment>
    );
  } else {
    return "";
  }
}
