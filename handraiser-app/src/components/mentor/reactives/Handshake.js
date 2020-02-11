import React from "react";
import HandShakeImage from "../../images/HandshakeEmoji.png";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import io from "socket.io-client";

var jwtDecode = require("jwt-decode");

export default function Handshake(props) {
  let socket = io(); //initial connection
  const classes = useStyles();
  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid; //mentor_user_id if mentor is logged in

  const accept = data => {

    socket.emit('update',{message:'server has been called'},()=>{
      return console.log('drawback')
    })

    // axios
    //   .patch(`http://localhost:5000/api/concern_list/${data.concern_id}`, {
    //     concern_id: data.concern_id,
    //     concern_title: data.concern_title,
    //     concern_description: data.concern_description,
    //     concern_status: 1
    //   })
    //   .then(data => {

    //     props.rowDatahandler(data.data);

    //     axios
    //       .get(
    //         `http://localhost:5000/api/assisted_by/${data.class_id}/${data.user_id}`,
    //         {}
    //       )
    //       .then(data => {
    //         //get data of who assisted this concern

    //         // if none then reference this current mentor
    //         if (data.data.length == 0) {
    //           axios.post(`http://localhost:5000/api/assisted_by`, {
    //             assist_status: "ongoing",
    //             class_id: data.class_id,
    //             // user_mentor_id: 3, //mock user_mentor_id data //used for checking
    //             user_mentor_id: user_id, //<<----------- correct way: uncomment if data is available
    //             user_student_id: data.user_id
    //           });
    //         } else {
    //           //reflect current mentor
    //           axios.patch(
    //             `http://localhost:5000/api/assistance/${data.data[0].assisted_id}/${data.data[0].class_id}/${data.data[0].user_student_id}`,
    //             {
    //               assisted_id: data.data[0].assisted_id,
    //               user_student_id: data.data[0].user_id,
    //               class_id: data.data[0].class_id,
    //               user_mentor_id: user_id,
    //               assist_status: "ongoing"
    //             }
    //           );
    //         }
    //       });
    //   });
  };

  return (
    <div className={classes.handshake_flex}>
      <div className={classes.handshake_container}>
        <div className={classes.handshake_text_container}>
          <p className={classes.handshake_text_main}>Respond to request?</p>
        </div>
        <div className={classes.triangle_aest} />
        <div
          className={classes.handshake_button_container}
          onClick={() => {
            accept(props.data);
          }}
        >
          <img className={classes.handshake_img} src={HandShakeImage} />
          <p className={classes.handshake_text_btn}>ACCEPT</p>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
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
    width: "500px",
    height: "100px",
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
  handshake_text_container: {
    marginLeft: "95px"
  },
  handshake_text_main: {
    fontSize: "1.5em"
  },
  handshake_text_btn: {
    fontSize: "0.8em",
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
    right: "-39px",
    zIndex: "0"
  }
}));
