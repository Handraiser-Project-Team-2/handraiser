import React, { useState, useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import IconButton from "@material-ui/core/IconButton";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Swal from "sweetalert2";
import "emoji-mart/css/emoji-mart.css";
import { useHistory, useParams } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import DetailPanel from "./DetailPanel/DetailPanel";
import Topbar from "../reusables/Topbar";
import Chatfield from "../reusables/Chatfield";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Fab from "@material-ui/core/Fab";

import Input from "../reusables/Input";
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
  Send,
  // Div2,
  // Shared,
  Request
} from "../../Styles/Styles";
import axios from "axios";
import Tabs from "./Tabs/Tabs";
import { UserContext } from "../Contexts/UserContext";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  span: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(5)
  },
  scrolltobottom: {
    padding: "5% 0",
    overflow: "auto",
    height: "40.9em",
    backgroundColor: "white",
    "@media (height: 894px)": {
      height: "35.4em"
    },
    "@media (height: 1625px)": {
      height: "81em"
    },
    "@media (height: 1366px)": {
      height: "64.8em"
    },
    "@media (width: 360px) and (height: 640px)": {
      height: "19.5em"
    },
    "@media (width: 411px) and (height: 731px)": {
      height: "25.2em"
    },
    "@media (width: 411px) and (height: 823px)": {
      height: "31em"
    },
    "@media (width: 320px) and (height: 568px)": {
      height: "15em"
    },
    "@media (width: 375px) and (height: 667px)": {
      height: "21.2em"
    },
    "@media (width: 414px) and (height: 736px)": {
      height: "25.5em"
    },
    "@media (width: 375px) and (height: 812px)": {
      height: "30.3em"
    }
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

var jwtDecode = require("jwt-decode");
let socket;
export default function Student({
  class_id,
  rowDatahandler,
  messages,
  sendMessage,
  setMessage,
  message,
  active,
  userid,
  feed,
  username,
  room,
  concernTitle,
  setConcernTitle
}) {
  // let socket = io("ws://172.60.62.113:5000", { transports: ["websocket"] });
  // let socket;
  const classes = useStyles();
  let history = useHistory();
  // let { class_id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({ user_type: "" });
  // const open = Boolean(anchorEl);
  const [concernDescription, setConcernDescription] = useState("");
  // const [concernTitle, setConcernTitle] = useState("");
  const [userImage, setUserImage] = useState("");
  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;
  const [name, setName] = useState("");
  const { cstate, getData, socket } = useContext(UserContext);
  ///for chat
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  // const [userid, setUserid] = useState("");
  // const [message, setMessage] = useState("");
  // const [feed, setfeed] = useState("");
  // const [active, setActive] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [avatar, setAvatar] = useState("");
  // const [emoji, setEmoji] = useState(false);
  // const [disable, setDisable] = useState(false);
  const ENDPOINT = "172.60.62.113:5000";
  // let socket = io(ENDPOINT);
  const [requestOpen, setRequestOpen] = useState(true);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // did mount
  useEffect(() => {
    // socket = io(ENDPOINT);
    socket.emit("join", { username: "Yow", room: class_id });

    socket.on("updateComponents", data => {
      existing();
    });
  }, [ENDPOINT]);

  //did update
  useEffect(() => {
    // socket = io(ENDPOINT);

    if (sessionStorage.getItem("token")) {
      axios
        .post("/api/user/data", {
          token: sessionStorage.getItem("token").split(" ")[1]
        })
        .then(data => {
          setUserImage(data.data.image);
          setState({
            user_type: data.data.user_type_id
          });

          const user_type = data.data.user_type_id;

          if (user_type !== 3) {
            Swal.fire({
              icon: "error",
              title: "You cannot access this page!"
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
        title: "You cannot access this page!"
      }).then(function() {
        history.push("/");
      });
    }

    if (!cstate) {
      getData();
    }

    existing();
  }, [cstate]);
  const sendRequest = () => {
    axios
      .post(`/api/student/request/assistance`, {
        class_id: class_id,
        user_id: user_id,
        concern_title: concernTitle,
        concern_description: message
      })
      .then(data => {
        // console.log(data.data);

        // add websocket here to reflect new request;

        setConcernTitle("");
        setMessage("");

        Swal.fire({
          icon: "success",
          title: "Request sent to the mentor"
        })
          .then(flag => {
            existing();

            socket.emit(
              "AddRequest",
              {
                concern_id: data.data.concern_id,
                concern_title: data.data.concern_title,
                concern_description: data.data.concern_description,
                concern_status: data.data.concern_status,
                class_id: data.data.class_id,
                user_id: data.data.user_id,
                cstate,
                room: class_id
              },
              () => {
                return console.log("drawback");
              }
            );
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //send data of active queue where user interacted with from the queue panel
  // const rowDatahandler = rowData => {
  //   setActive(true);

  //   socket.emit(
  //     "join",
  //     { userid, username, room: rowData.concern.concern_id, image: avatar },
  //     message => {
  //       console.log(message);
  //     }
  //   );

  //   setRoom(rowData.concern.concern_id);
  //   setConcernTitle(rowData.concern.concern_title);

  //   axios
  //     .get(`/api/userprofile/${rowData.concern.user_id}`, {})
  //     .then(data => {
  //       setName(data.data[0].first_name + " " + data.data[0].last_name);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  ////join to room
  // const join = () => {
  //   setActive(true);
  //   socket.emit("join", { username, room: "team2", image: avatar }, () => {});
  // };
  // useEffect(() => {
  //   socket.on("message", message => {
  //     setMessages([...messages, message]);
  //   });

  //   socket.on("old", ({ data }) => {
  //     // console.log(data);
  //     setMessages(data);
  //   });

  //   if (!cstate) {
  //     getData();
  //   }
  //   if (cstate) {
  //     // console.log(cstate);
  //     setUserid(cstate.user_id);
  //     setAvatar(cstate.image);
  //     setUsername(cstate.first_name);
  //   }

  //   return () => {
  //     socket.emit("disconnect");
  //     socket.off();
  //   };
  // }, [messages, cstate]);

  // const sendMessage = evt => {
  //   evt.preventDefault();
  //   const dateToday = new Date();
  //   setTimeout(() => {
  //     if (message) {
  //       socket.emit("sendMessage", message, () => setMessage(""));
  //       axios
  //         .post(`/api/chat/send`, {
  //           message: message,
  //           chat_date_created: dateToday,
  //           concern_id: room,
  //           user_id: userid
  //         })
  //         .then(res => {
  //           console.log(res);
  //         });
  //     }
  //   }, 100);

  //   setMessage("");
  // };

  // const emojiActive = () => {
  //   if (emoji === true) {
  //     setEmoji(false);
  //   } else {
  //     setEmoji(true);
  //   }
  //   // setEmoji(true)
  // };

  // const addEmoji = e => {
  //   let sym = e.unified.split("-");
  //   let codesArray = [];
  //   sym.forEach(el => codesArray.push("0x" + el));
  //   let emoji = String.fromCodePoint(...codesArray);
  //   setMessage(message + emoji);
  //   emojiActive();
  // };
  // console.log(messages);

  const [expanded, setExpanded] = React.useState("");

  const handleClickDetail = () => {
    setExpanded("panel1");
  };

  const handleClickMember = () => {
    setExpanded("panel2");
  };

  const existing = () => {
    if (class_id) {
      axios({
        method: "get",
        url: `/api/student/queue/order/${class_id}/${user_id}?search=${""}`
      })
        .then(res => {
          if (res.data.length > 0) {
            setRequestOpen(false);
          } else {
            setRequestOpen(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <React.Fragment>
      <Topbar rowDatahandler={rowDatahandler} classReference={class_id} />
      <Div>
        <Queue>
          <Tabs rowDatahandler={rowDatahandler} classReference={class_id} />
        </Queue>
        <Help>
          <Subject>
            <TitleName>
              <TextField
                id="standard-basic"
                value={concernTitle ? concernTitle : ""}
                fullWidth
                onChange={e => setConcernTitle(e.target.value)}
                inputProps={{
                  maxLength: 50
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subject</Typography>
                <Typography>
                  {concernTitle ? concernTitle.length : "0"}/50
                </Typography>
              </div>
            </TitleName>
            <Option>
              <span>
                <HelpOutlineIcon
                  onClick={handleClickDetail}
                  style={{
                    fontSize: 30,
                    cursor: "pointer",
                    color: "#372476"
                  }}
                />
              </span>
              <span>
                <PeopleOutlineIcon
                  onClick={handleClickMember}
                  style={{
                    fontSize: 30,
                    cursor: "pointer",
                    color: "#372476"
                  }}
                />
              </span>
              <div>
                <MoreVertIcon
                  onClick={handleMenu}
                  style={{
                    fontSize: 30,
                    color: "#372476",
                    cursor: "pointer"
                  }}
                />
              </div>
            </Option>
          </Subject>
          <ScrollToBottom className={classes.scrolltobottom}>
            {messages
              ? messages.map((message, i) => (
                  <div key={i} style={{ overflowWrap: "break-word" }}>
                    <Chatfield
                      message={message}
                      username={username}
                      feed={feed}
                      active={active}
                      userid={userid}
                    />
                  </div>
                ))
              : ""}

            <div>
              {feed && active === true ? (
                <div className={classes.cont2}>
                  <div className={classes.prof}>
                    <Avatar src={feed} />
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
          <Message>
            <Field>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Input
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                  username={username}
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "15px"
                  }}
                >
                  {requestOpen ? (
                    <Request onClick={sendRequest}>NEW REQUEST</Request>
                  ) : (
                    ""
                  )}
                  <Send onClick={sendMessage}>SEND</Send>
                </div>
                {/* </form> */}
              </div>
            </Field>
          </Message>
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
