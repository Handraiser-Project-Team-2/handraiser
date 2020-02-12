import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import HandShakeImage from "../images/HandshakeEmoji.png";
import { makeStyles } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import GroupIcon from "@material-ui/icons/Group";
import HelpIcon from "@material-ui/icons/Help";
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
import DetailPanel from "./DetailPanel/DetailPanel";
import Topbar from "../reusables/Topbar";
import Chatfield from "../reusables/Chatfield";
import Handshake from "./reactives/Handshake";
import Input from "../reusables/Input";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import "emoji-mart/css/emoji-mart.css";
var jwtDecode = require("jwt-decode");
let socket;
const useStyles = makeStyles(theme => ({
  handshake: {
    marginLeft: theme.spacing(3),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: teal[500],
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export default function Mentor() {
  const classes = useStyles();
  let history = useHistory();
  let { class_id } = useParams();
  const [rowData, setRowData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [name, setName] = useState("");
  const [concernTitle, setConcernTitle] = useState("");
  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid; //mentor_user_id if mentor is logged in

  ///for chat
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [feed, setfeed] = useState("");
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [emoji, setEmoji] = useState(false);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(socket);
  }, [ENDPOINT]);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    if (rowData.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No concern selected!",
        text: "Please select a concern."
      });
    }
    setConcernTitle("");
    setName("");
    setAnchorEl(null);

    axios
      .patch(`http://localhost:5000/api/concern_list/${rowData.concern_id}`, {
        concern_id: rowData.concern_id,
        concern_title: rowData.concern_title,
        concern_description: rowData.concern_description,
        concern_status: 3
      })
      .then(data => {
        axios
          .get(
            `http://localhost:5000/api/assisted_by/${data.data.class_id}/${data.data.user_id}`,
            {}
          )
          .then(data => {
            axios.patch(
              `http://localhost:5000/api/assistance/${data.data[0].assisted_id}/${data.data[0].class_id}/${data.data[0].user_student_id}`,
              {
                assisted_id: data.data[0].assisted_id,
                user_student_id: data.data[0].user_id,
                class_id: data.data[0].class_id,
                assist_status: "done"
              }
            );
          });
        window.location.reload();
      });
  };

  const handleBackQueue = rowData => {
    if (rowData.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No concern selected!",
        text: "Please select a concern."
      });
    }
    setConcernTitle("");
    setName("");
    setAnchorEl(null);
    axios
      .patch(`http://localhost:5000/api/concern_list/${rowData.concern_id}`, {
        concern_id: rowData.concern_id,
        concern_title: rowData.concern_title,
        concern_description: rowData.concern_description,
        concern_status: 2
      })
      .then(data => {
        axios
          .get(`http://localhost:5000/api/assisted_by/${data.data.user_id}`, {})
          .then(data => {
            axios.delete(
              `http://localhost:5000/api/assisted_by/${data.data[0].user_student_id}`,
              {}
            );
          });
      });
  };

  const rowDatahandler = rowData => {
    console.log(rowData);
    setConcernTitle(rowData.concern_title);
    setRowData(rowData);
    axios
      .get(`http://localhost:5000/api/userprofile/${rowData.user_id}`, {})
      .then(data => {
        setName(data.data[0].first_name + " " + data.data[0].last_name);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("http://localhost:5000/api/user/data", {
          token: sessionStorage.getItem("token").split(" ")[1]
        })
        .then(data => {
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
          // console.log(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "You cannot access this page!"
      }).then(function() {
        history.push("/");
      });
    }
  });

  return (
    <React.Fragment>
      <Topbar />
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
        <MenuItem onClick={e => handleDone(rowData)}>Done</MenuItem>
        <MenuItem onClick={e => handleBackQueue(rowData)}>
          Back to Queue
        </MenuItem>
      </Menu>
      <Div>
        <Queue>
          <Tabs rowDatahandler={rowDatahandler} class_id={class_id} />
        </Queue>
        <Help>
          <Subject>
            <TitleName
              style={{
                paddingTop: "25px"
              }}
            >
              <Typography variant="h5">Concern: {concernTitle}</Typography>
              <Typography
                variant="subtitle2"
                style={{
                  fontSize: "12.4px"
                }}
              >
                From: {name}
              </Typography>
            </TitleName>
            <Option>
              <div>
                <HelpIcon
                  style={{
                    fontSize: 30,
                    color: "#c4c4c4",
                    cursor: "pointer",
                    color: "#372476"
                  }}
                />
              </div>
              <div>
                <GroupIcon
                  style={{
                    fontSize: 30,
                    color: "#c4c4c4",
                    cursor: "pointer",
                    color: "#372476"
                  }}
                />
              </div>
              <div>
                <MoreVertIcon
                  onClick={handleMenu}
                  style={{
                    fontSize: 30,
                    color: "#c4c4c4",
                    cursor: "pointer",
                    color: "#372476"
                  }}
                />
              </div>
            </Option>
          </Subject>

          {rowData.concern_status === 2 ? (
            <Handshake data={rowData} rowDatahandler={rowDatahandler} />
          ) : (
            ""
          )}

          <Chatfield />

          {rowData.concern_status === 2 ? (
            ""
          ) : (
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
                    {/* <TextField
                      id="outlined-textarea"
                      multiline
                      variant="outlined"
                      fullWidth
                      rows="3"
                    /> */}
                    <Input />

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
          )}
        </Help>
        <DetailPanel />
      </Div>
    </React.Fragment>
  );
}
