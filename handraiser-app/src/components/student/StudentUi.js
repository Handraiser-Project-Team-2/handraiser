import React, { useState, useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Swal from "sweetalert2";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { useHistory, useParams } from "react-router-dom";
import DetailPanel from "./DetailPanel/DetailPanel";
import Topbar from "../reusables/Topbar";
import Chatfield from "../reusables/Chatfield";
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
  Shared,
  Request
} from "../Styles/Styles";
import axios from "axios";
import Tabs from "./Tabs/Tabs";
import { UserContext } from "../Contexts/UserContext";
import io from "socket.io-client";

var jwtDecode = require("jwt-decode");

export default function Student() {
  let socket = io("ws://localhost:5000", { transports: ["websocket"] });
  // let socket;
  let history = useHistory();
  let { class_id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({ user_type: "" });
  const open = Boolean(anchorEl);
  const [concernDescription, setConcernDescription] = useState("");
  const [concernTitle, setConcernTitle] = useState("");
  const [userImage, setUserImage] = useState("");
  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;
  const [name, setName] = useState("");
  const { cstate, getData } = useContext(UserContext);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sendMsg = evt => {
    evt.preventDefault();
    // console.log(concernDescription);
  };


  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    if (sessionStorage.getItem("token")) {
      axios
        .post("http://localhost:5000/api/user/data", {
          token: sessionStorage.getItem("token").split(" ")[1]
        })
        .then(data => {
          console.log(userImage);
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
  }, [cstate, ENDPOINT]);

  const sendRequest = () => {
    socket.emit("join", { username: "Yow", room: class_id, image: "" });

    axios
      .post(`http://localhost:5000/api/student/request/assistance`, {
        class_id: class_id,
        user_id: user_id,
        concern_title: concernTitle,
        concern_description: concernDescription
      })
      .then(data => {
        console.log(data.data);


        // add websocket here to reflect new request;

        setConcernTitle("");
        setConcernDescription("");

        Swal.fire({
          icon: "success",
          title: "Request sent to the mentor"
        })
          .then((flag) => {

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
  const rowDatahandler = rowData => {
    console.log(rowData)
    setConcernTitle(rowData.concern.concern_title);
    // setRowData(rowData);
    axios
      .get(`http://localhost:5000/api/userprofile/${rowData.concern.user_id}`, {})
      .then(data => {
        setName(data.data[0].first_name + " " + data.data[0].last_name);
      }).catch(err=>{
        console.log(err)
      })
  };

  return (
    <React.Fragment>
      <Topbar />
      <Div>
        <Queue>
          <Tabs  rowDatahandler={rowDatahandler} classReference={class_id} />
        </Queue>
        <Help>
          <Subject>
            <TitleName>
              <TextField
                id="standard-basic"
                value={concernTitle}
                fullWidth
                onChange={e => setConcernTitle(e.target.value)}
                // style={{ width: 700 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subject</Typography>
                <Typography>{concernTitle.length}/30</Typography>
              </div>
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
          <Chatfield userImage={userImage} />
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
                    rows="2"
                    value={concernDescription}
                    style={{
                      backgroundColor: "white"
                    }}
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
        <DetailPanel />
      </Div>
    </React.Fragment>
  );
  // } else {
  //   return "";
  // }
}
