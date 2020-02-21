
import React, { useEffect, useContext } from "react";
import HandShakeImage from "../../images/HandshakeEmoji.png";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import io from "socket.io-client";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../Contexts/UserContext";

var jwtDecode = require("jwt-decode");

export default function Handshake(props) {
  let { class_id } = useParams();

  const classes = useStyles();
  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid; //mentor_user_id if mentor is logged in
  const { socket } = useContext(UserContext);
  // const ENDPOINT = "172.60.62.113:5000";

  // let socket = io(ENDPOINT);

  useEffect(() => {
    // socket = io(ENDPOINT);

    socket.emit("join", {
      username: "hanshakes",
      room: class_id
    });
  });
  // useEffect(() => {
  //   if (!cstate) {
  //     getData();
  //   }
  //   if (cstate) {
  //     console.log(cstate.user_type_id);
  //     setUserid(cstate.user_id);
  //     setUsername(cstate.first_name);
  //   }
  // }, [cstate]);

  const accept = highdata => {
    axios
      .patch(`/api/concern_list/${highdata.concern_id}`, {
        concern_id: highdata.concern_id,
        concern_title: highdata.concern_title,
        concern_description: highdata.concern_description,
        concern_status: 1
      })
      .then(data => {
        props.rowDatahandler(data.data);
        socket.emit("handshake", { room: highdata.class_id });
        // socket.emit("join", { userid, username, room:data.data.concern_id }, () => {});
      
        axios
          .get(`/api/assisted_by/${highdata.class_id}/${highdata.user_id}`, {})
          .then(data => {
            //get data of who assisted this concern

            // if none then reference this current mentor
            if (data.data.length === 0) {
              axios
                .post(`/api/assisted_by`, {
                  assist_status: "ongoing",
                  class_id: highdata.class_id,
                  // user_mentor_id: 3, //mock user_mentor_id data //used for checking
                  user_mentor_id: user_id, //<<----------- correct way: uncomment if data is available
                  user_student_id: highdata.user_id
                })
                .then(data => {
                  console.log(data);
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              //reflect current mentor
              axios
                .patch(
                  `/api/assistance/${data.data[0].assisted_id}/${data.data[0].class_id}/${data.data[0].user_student_id}`,
                  {
                    assisted_id: data.data[0].assisted_id,
                    user_student_id: data.data[0].user_id,
                    class_id: data.data[0].class_id,
                    user_mentor_id: user_id,
                    assist_status: "ongoing"
                  }
                )
                .then(data => {
                  console.log(data);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={classes.handshake_flex}>
      <div className={classes.handshake_container}>
        <div className={classes.handshake_text_container}>
          <p className={classes.handshake_text_main}>Respond to request?</p>
        </div>

        <div className={classes.button_flex_container}>
          <div className={classes.button_main_container_2}>
            <div className={classes.triangle_aest} />
            <div
              className={classes.handshake_button_container}
              onClick={() => {
                accept(props.data);
                // window.location.reload();
              }}
            >
              <img className={classes.handshake_img} src={HandShakeImage} />
              <p className={classes.handshake_text_btn}>ACCEPT</p>
            </div>
          </div>

          <div className={classes.button_main_container}>
            <div className={classes.triangle_aest_2} />
            <div
              className={classes.handshake_button_container_2}
              onClick={() => {
                props.handleDone(props.data);
                // window.location.reload();
              }}
            >
              {/* <img className={classes.handshake_img} src={HandShakeImage} /> */}
              <p className={classes.handshake_text_btn_2}>X</p>

              <p className={classes.handshake_text_btn}>CLOSE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  button_flex_container: {
    display: "flex",
    height: "100%"
  },
  button_main_container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2"
  },
  button_main_container_2: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    left: "25px",
    zIndex: "1"
  },
  handshake_main_btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  handshake_flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "34px",
    background: "#eaeaea",
    paddingBottom: "10px"
  },
  handshake_container: {
    width: "600px",
    height: "121px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    left: "35%",
    top: "195px",
    background: "white",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)"
  },
  handshake_button_container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100px",
    cursor: "pointer",
    background: "#2FDC5F",
    "&:hover": {
      background: "#00eb41"
    },
    "&:hover div": {
      borderColor: "transparent #00eb41 transparent transparent"
    },
    zIndex: "1"
  },
  handshake_button_container_2: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100px",
    cursor: "pointer",
    background: "#F00A38",
    "&:hover": {
      background: "#c4032a"
    },
    "&:hover div": {
      borderColor: "transparent #00eb41 transparent transparent"
    },
    zIndex: "1"
  },
  handshake_text_container: {
    marginLeft: "95px"
  },
  handshake_text_main: {
    fontSize: "1.5em",
    "@media (max-width: 468px) ": {
      fontSize: "1em"
    }
  },
  handshake_text_btn: {
    fontSize: "0.8em",
    color: "white",
    fontWeight: "800"
  },
  handshake_text_btn_2: {
    fontSize: "3em",
    color: "white",
    fontWeight: "800"
  },
  handshake_img: {
    backgroundSize: "cover",
    width: "50px",
    height: "50px",
    marginBottom: "10px"
  },
  triangle_aest: {
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "12.5px 25px 12.5px 0",
    borderColor: "transparent #2FDC5F transparent transparent",
    position: "relative",
    top: "2px",
    right: "-6px",
    zIndex: "0"
  },
  triangle_aest_2: {
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "12.5px 25px 12.5px 0",
    borderColor: "transparent #F00A38 transparent transparent",
    position: "relative",
    top: "2px",
    right: "-6px",
    zIndex: "0"
  }
}));
