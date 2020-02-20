import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import GroupIcon from "@material-ui/icons/Group";
import HelpIcon from "@material-ui/icons/Help";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import {
  Div,
  // Nav,
  Queue,
  Help,
  Subject,
  TitleName,
  Option,
  // More,
  // Conversation,
  Message,
  Field,
  Send
  // Div2,
  // Shared
} from "../../Styles/Styles";
import axios from "axios";
import Tabs from "./Tabs/Tabs";
import DetailPanel from "./DetailPanel/DetailPanel";
import Topbar from "../reusables/Topbar";
import Chatfield from "../reusables/Chatfield";
import Handshake from "./reactives/Handshake";
import Input from "../reusables/Input";
import io from "socket.io-client";
// import ScrollToBottom from "react-scroll-to-bottom";
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
  },
  span: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(5)
  },
  scrolltobottom: {
    padding: "5% 0",
    overflow: "auto",
    height: "39.7em",
    backgroundColor: "white"
  },
  cont2: {
    display: " flex",
    marginTop: "10px",
    marginRight: "15px",
    padding: "10px",
    flexDirection: "row"
  },
  prof: {
    display: "flex",
    marginLeft: "10px",
    alignItems: "flex-end"
  },
  receiver: {
    marginLeft: "10px",
    backgroundColor: "white",
    maxWidth: "450px",
    padding: "10px 20px 10px 20px",
    borderRadius: "10px 10px 10px 0px"
  },
  animation: {
    display: "inline-block",
    backgroundColor: "white",
    width: "5px",
    height: "5px",
    borderRadius: "100%",
    marginRight: "5px",
    animation: "bob 2s infinite"
  }
}));
const DivAnimation = styled.div`
  span {
    display: inline-block;
    background-color: white;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    margin-right: 5px;
    animation: bob 2s infinite;
  }
  span:nth-child(1) {
    animation-delay: -1s;
  }
  span:nth-child(2) {
    animation-delay: -0.85s;
  }
  span:nth-child(3) {
    animation-delay: -0.7s;
    margin-right: 0;
  }
  @keyframes bob {
    10% {
      transform: translateY(-10px);
      background-color: #9e9da2;
    }
    50% {
      transform: translateY(0);
      background-color: #b6b5ba;
    }
  }
`;
 const interact = {
    height: "96px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (height: 894px)": {
      height: "86px"
    },
    "@media (height: 1625px)": {
      height: "210px"
    },
    "@media (width: 360px) and (height: 640px)": {
      height: "40px"
    },
    "@media (width: 411px) and (height: 731px)": {
      height: "50px"
    },
    "@media (width: 411px) and (height: 823px)": {
      height: "50px"
    },
    "@media (width: 320px) and (height: 568px)": {
      height: "30px"
    },
    "@media (width: 375px) and (height: 667px)": {
      height: "45px"
    },
    "@media (width: 414px) and (height: 736px)": {
      height: "55px"
    },
    "@media (width: 375px) and (height: 812px)": {
      height: "75px"
    }
  }


export default function Mentor({
  class_id,
  rowDatahandler,
  messages,
  sendMessage,
  setMessage,
  setMessages,
  message,
  active,
  userid,
  feed,
  username,
  room,
  handleBackQueue,
  handleDone,
  selection,
  rowData
}) {
  const classes = useStyles();
  let history = useHistory();
  // let { class_id } = useParams();
  // const [rowData, setRowData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [name, setName] = useState("");
  const [concernTitle, setConcernTitle] = useState("");
  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  // const user_id = decoded.userid; //mentor_user_id if mentor is logged in

  ///for chat
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  // const [message, setMessage] = useState("");
  // const [feed, setfeed] = useState("");
  // const [active, setActive] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [avatar, setAvatar] = useState("");
  // const [emoji, setEmoji] = useState(false);
  // const ENDPOINT = "localhost:5000";

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   console.log(socket);
  // }, [ENDPOINT]);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const sendMsg = evt => {
  //   evt.preventDefault();
  //   // console.log(name);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   axios.patch(
  //     `http://172.60.62.113:5001/api/concern_list/${rowData.concern_id}`,
  //     {
  //       concern_id: rowData.concern_id,
  //       concern_status: 1
  //     }
  //   );
  // };

  // const handleDone = rowData => {
  //   setSelection(false);

  //   if (rowData.length === 0) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "No concern selected!",
  //       text: "Please select a concern."
  //     });
  //   }
  //   setConcernTitle("");
  //   setName("");
  //   setAnchorEl(null);

  //   axios
  //     .patch(`/api/concern_list/${rowData.concern_id}`, {
  //       concern_id: rowData.concern_id,
  //       concern_title: rowData.concern_title,
  //       concern_description: rowData.concern_description,
  //       concern_status: 3
  //     })
  //     .then(data => {
  //       axios
  //         .get(
  //           `/api/assisted_by/${data.data.class_id}/${data.data.user_id}`,
  //           {}
  //         )
  //         .then(data => {
  //           axios
  //             .patch(
  //               `/api/assistance/${data.data[0].assisted_id}/${data.data[0].class_id}/${data.data[0].user_student_id}`,
  //               {
  //                 assisted_id: data.data[0].assisted_id,
  //                 user_student_id: data.data[0].user_id,
  //                 class_id: data.data[0].class_id,
  //                 assist_status: "done"
  //               }
  //             )
  //             .then(data => {
  //               socket.emit("handshake", { room: class_id });
  //             })
  //             .catch(err => {
  //               console.log(err);
  //             });
  //         });
  //     });
  // };

  // const [selection, setSelection] = useState(false);

  // const handleBackQueue = rowData => {
  //   setSelection(false);

  //   if (rowData.length === 0) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "No concern selected!",
  //       text: "Please select a concern."
  //     });
  //   }
  //   setConcernTitle("");
  //   setName("");
  //   setAnchorEl(null);
  //   axios
  //     .patch(`/api/concern_list/${rowData.concern_id}`, {
  //       concern_id: rowData.concern_id,
  //       concern_title: rowData.concern_title,
  //       concern_description: rowData.concern_description,
  //       concern_status: 2
  //     })
  //     .then(data => {
  //       socket.emit("handshake", { room: class_id });

  //       axios.get(`/api/assisted_by/${data.data.user_id}`, {}).then(data => {
  //         axios.delete(`/api/assisted_by/${data.data[0].user_student_id}`, {});
  //       });
  //     });
  // };

  // const rowDatahandler = rowData => {
  //   setSelection(true);
  //   setConcernTitle(rowData.concern_title);
  //   setRowData(rowData);
  //   axios
  //     .get(`/api/userprofile/${rowData.user_id}`, {})
  //     .then(data => {
  //       setName(data.data[0].first_name + " " + data.data[0].last_name);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("/api/user/data", {
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

  const [expanded, setExpanded] = React.useState("");

  const handleClickDetail = () => {
    setExpanded("panel1");
  };

  const handleClickMember = () => {
    setExpanded("panel2");
  };

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
        <MenuItem onClick={e => handleDone(rowData)}>Mark as Done</MenuItem>
        <MenuItem onClick={e => handleBackQueue(rowData)}>
          Back to Queue
        </MenuItem>
      </Menu>
      <Div>
        <Queue>
          <Tabs rowDatahandler={rowDatahandler} class_id={class_id} />
        </Queue>
        <Help>
          {selection ? (
            <Subject>
              <TitleName
                style={{
                  paddingTop: "25px"
                }}
              >
                <Typography variant="h5">
                  {selection
                    ? `Concern: ${concernTitle}`
                    : `Select any concern to interact`}
                </Typography>
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
                    onClick={handleClickDetail}
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
                    onClick={handleClickMember}
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
          ) : (
            <div className={classes.interact}>
              <Typography variant="h5" style={{ color: "#bcbcbc" }}>
                Select any concern to interact
              </Typography>
            </div>
          )}

          {selection && rowData.concern_status === 2 ? (
            <Handshake
              data={rowData}
              rowDatahandler={rowDatahandler}
              handleDone={handleDone}
            />
          ) : (
            ""
          )}

          {selection ? (
             <ScrollToBottom className={classes.scrolltobottom}>
             {messages.map((message, i) => (
               <div key={i} style={{ overflowWrap: "break-word" }}>
              
                   <Chatfield
                 
                     message={message}
                     username={username}
                     feed={feed}
                     active={active}
                     userid={userid}
                   />
               
               </div>
              
             ))}
    
             <div>
               {feed && active === true ? (
                 <div className={classes.cont2}>
                   <div className={classes.prof}>
                     {/* <Avatar src={feed} /> */}
                   </div>
                   <div className={classes.receiver}>
                     <DivAnimation>
                       <span></span>
                       <span></span>
                       <span></span>
                     </DivAnimation>
                   </div>
                 </div>
               ) : null}
             </div>
           </ScrollToBottom>
          ) : (
            <div
              style={{
                height: "83vh",
                width: "100%",
                background: "#f5f5f5"
              }}
            ></div>
          )}

          {selection ? (
            rowData.concern_status === 2 ? (
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
                    <form onSubmit={sendMessage}>
                      {/* <TextField
                        id="outlined-textarea"
                        multiline
                        variant="outlined"
                        fullWidth
                        rows="3"
                      /> */}
                      <Input
                      message={message}
                      setMessage={setMessage}
                      sendMessage={sendMessage}
                      username={username}
                    />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "15px"
                        }}
                      >
                        <Send onClick={sendMessage}>SEND</Send>
                      </div>
                    </form>
                  </div>
                </Field>
              </Message>
            )
          ) : (
            ""
          )}
        </Help>
        <DetailPanel
          class_id={class_id}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </Div>
    </React.Fragment>
  );
}
