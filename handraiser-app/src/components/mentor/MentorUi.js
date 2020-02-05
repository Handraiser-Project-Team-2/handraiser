import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
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
  Shared
} from "../Styles/Styles";
import axios from "axios";

import Tabs from "./Tabs/Tabs";

export default function Student() {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({ user_type: "" });
  const open = Boolean(anchorEl);
  const [name, setName] = useState("");
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sendMsg = evt => {
    evt.preventDefault();
    console.log(name);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("/api/user/data", {
          token: sessionStorage.getItem("token").split(" ")[1]
        })
        .then(data => {
          setState({ user_type: data.data.user_type_id });
          const user_type = data.data.user_type_id;
          if (user_type !== 4) {
            Swal.fire({
              icon: "error",
              title: "You cannot acces this page!"
            }).then(function() {
              if (user_type === 3) {
                history.push("/student");
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

  if (state.user_type === 1) {
    return (
      <React.Fragment>
        <Nav>
          <AppBar style={{ backgroundColor: "#372476" }}>
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton edge="start" aria-label="menu">
                  <MenuIcon style={{ color: "white" }} />
                </IconButton>
                <Typography variant="h6">Handraiser Admin</Typography>
              </div>
              <div>
                <IconButton
                  aria-label="account of current user"
                  edge="end"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{ fontSize: 40 }} />
                </IconButton>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Nav>
        <Div>
          <Queue>
            <Tabs />
          </Queue>
          <Help>
            <Subject>
              <TitleName>
                <Typography variant="h4">Error in Docker Compose</Typography>
                <Typography variant="h6">From: Kobe Bryant</Typography>
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
                  <span id="display"></span>
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
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "15px"
                      }}
                    >
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
