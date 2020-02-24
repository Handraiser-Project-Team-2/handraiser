import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import io from "socket.io-client";
import StudentUi from "../student/StudentUi";
import MentorUi from "../mentor/MentorUi";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
let socket;
export default function Chat() {
  let history = useHistory();
  const { cstate, getData } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [userid, setUserid] = useState("");
  const [message, setMessage] = useState("");
  const [feed, setfeed] = useState("");
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [usertypeid, setUsertypeid] = useState("");
  const [name, setName] = useState("");
  const [concernTitle, setConcernTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowData, setRowData] = useState([]);
  const ENDPOINT = "localhost:5000";

  let { class_id } = useParams();

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", { userid, username, room }, () => {});

    socket.on("old", ({ data }) => {
      //retreiving old messages
      setMessages(data);
    });
  }, [ENDPOINT, room]);

  useEffect(() => {
    if (!cstate) {
      getData();
    }
    if (cstate) {
      console.log(cstate.user_type_id);
      setUsertypeid(cstate.user_type_id);
      setUserid(cstate.user_id);
      setAvatar(cstate.image);
      setUsername(cstate.first_name);
    }
  }, [cstate]);

  useEffect(() => {
    socket.on("message", message => {
      console.log(message);
      setMessages([...messages, message]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    const dateToday = new Date();
    setTimeout(() => {
      if (message) {
        socket.emit("sendMessage", message, () => setMessage(""));
        axios
          .post(`/api/chat/send`, {
            message: message,
            chat_date_created: dateToday,
            concern_id: room,
            user_id: userid
          })
          .then(res => {
            console.log(res);
          });
      }
    }, 100);
  };

  const handleDone = rowData => {
    setSelection(false);

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
      .patch(`/api/concern_list/${rowData.concern_id}`, {
        concern_id: rowData.concern_id,
        concern_title: rowData.concern_title,
        concern_description: rowData.concern_description,
        concern_status: 3
      })
      .then(data => {
        axios
          .get(
            `/api/assisted_by/${data.data.class_id}/${data.data.user_id}`,
            {}
          )
          .then(data => {
            axios
              .patch(
                `/api/assistance/${data.data[0].assisted_id}/${data.data[0].class_id}/${data.data[0].user_student_id}`,
                {
                  assisted_id: data.data[0].assisted_id,
                  user_student_id: data.data[0].user_id,
                  class_id: data.data[0].class_id,
                  assist_status: "done"
                }
              )
              .then(data => {
                socket.emit("handshake", { room: class_id });
              })
              .catch(err => {
                console.log(err);
              });
          });
      });
  };

  const [selection, setSelection] = useState(false);

  const handleBackQueue = rowData => {
    setSelection(false);

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
      .patch(`/api/concern_list/${rowData.concern_id}`, {
        concern_id: rowData.concern_id,
        concern_title: rowData.concern_title,
        concern_description: rowData.concern_description,
        concern_status: 2
      })
      .then(data => {
        socket.emit("handshake", { room: class_id });

        axios.get(`/api/assisted_by/${data.data.user_id}`, {}).then(data => {
          axios.delete(`/api/assisted_by/${data.data[0].user_student_id}`, {});
        });
      });
  };

  const rowDatahandler = rowData => {
    if (usertypeid === 3 && rowData) {
      socket.emit(`leave_room`, { room: room });
      console.log(rowData.concern.concern_id);

      // localStorage.setItem("room",rowData.concern.concern_id)
      setActive(true);
      setRoom(rowData.concern.concern_id);
      setConcernTitle(rowData.concern.concern_title);

      axios
        .get(`/api/userprofile/${rowData.concern.user_id}`, {})
        .then(data => {
          setName(data.data[0].first_name + " " + data.data[0].last_name);
        })
        .catch(err => {
          console.log(err);
        });
    } else {

      socket.emit(`leave_room`, { room: room });
      setSelection(true);
      setConcernTitle(rowData.concern_title);
      setRowData(rowData);
      axios
        .get(`/api/userprofile/${rowData.user_id}`, {})
        .then(data => {
          setRoom(rowData.concern_id);
          setName(data.data[0].first_name + " " + data.data[0].last_name);
        })

        .catch(err => {
          console.log(err);
        });
    }

    if (socket.connected === false) {
      alert("Oops! You're clicking too fast");
      window.location.reload();
    }
    // setRoom(rowData.concern.concern_id);
    // setConcernTitle(rowData.concern.concern_title);
  };

  const closeFlag = () => {
    setConcernTitle("");
    // setMessages([]);
    setRoom(0);
    setSelection(false)
  };
  return (
    <div>
      {usertypeid === 3 ? (
        <StudentUi
          class_id={class_id}
          sendMessage={sendMessage}
          messages={messages}
          message={message}
          rowDatahandler={rowDatahandler}
          setMessage={setMessage}
          feed={feed}
          active={active}
          userid={userid}
          username={username}
          name={name}
          concernTitle={concernTitle}
          setConcernTitle={setConcernTitle}
          closeFlag={closeFlag}
          setMessages={setMessages}
        />
      ) : null}
      {usertypeid === 4 ? (
        <MentorUi
          class_id={class_id}
          sendMessage={sendMessage}
          messages={messages}
          message={message}
          rowDatahandler={rowDatahandler}
          setMessage={setMessage}
          feed={feed}
          active={active}
          userid={userid}
          username={username}
          setSelection={setSelection}
          handleDone={handleDone}
          handleBackQueue={handleBackQueue}
          selection={selection}
          rowData={rowData}
          concernTitle={concernTitle}
          closeFlag={closeFlag}
        />
      ) : null}
    </div>
  );
}
