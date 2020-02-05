import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

export default function Mentor() {
  let history = useHistory();
  const [rowData, setRowData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [name, setName] = useState("");
  const [concern_title, setConcern_title] = useState("");
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const sendMsg = evt => {
    evt.preventDefault();
    // console.log(name);
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  //   axios.patch(
  //     `http://localhost:5001/api/concern_list/${rowData.concern_id}`,
  //     {
  //       concern_id: rowData.concern_id,
  //       concern_status: 1
  //     }
  //   );
  // };

  const handleDone = rowData => {
    setAnchorEl(null);
    // setConcern_title("");
    axios
      .patch(`http://localhost:5001/api/concern_list/${rowData.concern_id}`, {
        concern_id: rowData.concern_id,
        concern_title: rowData.concern_title,
        concern_description: rowData.concern_description,
        concern_status: 3
      })
      .then(data => {
        axios
          .get(`http://localhost:5001/api/assisted_by/${data.data.user_id}`, {})
          .then(data => {
            axios.patch(
              `http://localhost:5001/api/assistance/${data.data[0].assisted_id}/${data.data[0].class_id}/${data.data[0].user_student_id}`,
              {
                assisted_id: data.data[0].assisted_id,
                user_student_id: data.data[0].user_id,
                class_id: data.data[0].class_id,
                assist_status: "done"
              }
            );
          });
      });
  };

  const handleBackQueue = rowData => {
    setAnchorEl(null);
    axios.patch(
      `http://localhost:5001/api/concern_list/${rowData.concern_id}`,
      {
        concern_id: rowData.concern_id,
        concern_title: rowData.concern_title,
        concern_description: rowData.concern_description,
        concern_status: 2
      }
    );
  };

  const rowDatahandler = rowData => {
    console.log(rowData);
    setRowData(rowData);
    axios
      .patch(`http://localhost:5001/api/concern_list/${rowData.concern_id}`, {
        concern_id: rowData.concern_id,
        concern_title: rowData.concern_title,
        concern_description: rowData.concern_description,
        concern_status: 1
      })
      .then(data => {
        axios
          .get(`http://localhost:5001/api/assisted_by/${rowData.user_id}`, {})
          .then(data => {
            if (data.data.length == 0) {
              axios.post(`http://localhost:5001/api/assisted_by`, {
                assist_status: "ongoing",
                class_id: rowData.class_id,
                user_mentor_id: 3, //mock user_mentor_id data
                user_student_id: rowData.user_id
              });
            } else {
              axios.patch(
                `http://localhost:5001/api/assistance/${data.data[0].assisted_id}/${data.data[0].class_id}/${data.data[0].user_student_id}`,
                {
                  assisted_id: data.data[0].assisted_id,
                  user_student_id: data.data[0].user_id,
                  class_id: data.data[0].class_id,
                  assist_status: "ongoing"
                }
              );
            }
          });
      });
    axios
      .get(`http://localhost:5001/api/userprofile/${rowData.user_id}`, {})
      .then(data => {
        setName(data.data[0].first_name + " " + data.data[0].last_name);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("http://localhost:5001/api/user/data", {
          token: sessionStorage.getItem("token").split(" ")[1]
        })
        .then(data => {
          const user_type = data.data.user_type_id;

          // if (user_type !== 4) {
          //   Swal.fire({
          //     icon: "error",
          //     title: "You cannot acces this page!"
          //   }).then(function() {
          //     if (user_type === 3) {
          //       history.push("/student");
          //     } else if (user_type === 1) {
          //       history.push("/superadmin");
          //     }
          //   });
          // }
        })
        .catch(err => {
          // console.log(err);
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
              // onClose={handleClose}
            >
              <MenuItem onClick={e => handleDone(rowData)}>Done</MenuItem>
              <MenuItem onClick={e => handleBackQueue(rowData)}>
                Back to Queue
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Nav>
      <Div>
        <Queue>
          <Tabs rowDatahandler={rowDatahandler} />
        </Queue>
        <Help>
          <Subject>
            <TitleName>
              <Typography variant="h4">
                Concern: {rowData.concern_title}
              </Typography>
              <Typography variant="h6">From: {name}</Typography>
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
          <Conversation></Conversation>
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
  // }
}
