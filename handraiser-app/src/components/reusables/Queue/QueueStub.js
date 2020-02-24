import React, { useState, useEffect,useContext } from "react";
import Handshake from "../../images/handshake.gif";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Paper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from "sweetalert2";
import axios from "axios";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import { UserContext } from "../../Contexts/UserContext";
export default function QueueStub(props) {
  const { socket } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();
  const [concernsData, setConcernsData] = useState();
  const [concern, setConcern] = useState("");
  const classes = useStyles();
  const open = Boolean(anchorEl);

  // const ENDPOINT = "172.60.62.113:5000";
  // // let socket = io(ENDPOINT);

  // useEffect(() => {
  //   console.log("asdsad",socket)
  // }, [ENDPOINT]);

  const handleMenu = (event, concern) => {
    setConcern(concern);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConcernData = (data, index) => {
    if (props.rowDatahandler.rowDatahandler) {
      props.rowDatahandler.rowDatahandler(data);
    }
    setSelectedIndex(index);
  };

  const handleBackQueue = () => {
    if (concern.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No concern selected!",
        text: "Please select a concern."
      });
    }
    setAnchorEl(null);


    axios
      .patch(`/api/concern_list/${concern.concern_id}`, {
        concern_id: concern.concern_id,
        concern_title: concern.concern_title,
        concern_description: concern.concern_description,
        concern_status: 2
      })
      .then(data => {
        if (props.update) props.update("");

        socket.emit("handshake", { room: props.rowDatahandler.class_id });

        axios
          .get(`/api/assisted_by/${data.data.user_id}`, {})
          .then(data => {
            axios
              .delete(`/api/assisted_by/${data.data[0].user_student_id}`, {})
              .then(data => {
                console.log(data);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDone = () => {
    setAnchorEl(null);

    axios
      .patch(`/api/concern_list/${concern.concern_id}`, {
        concern_id: concern.concern_id,
        concern_title: concern.concern_title,
        concern_description: concern.concern_description,
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
                socket.emit("handshake", {
                  room: props.rowDatahandler.class_id
                });

                if (props.update) props.update("");
              })
              .catch(err => {
                console.log(err);
              });
          });
      });
  };

  const StatusStub_QUEUE = (
    <div className={classes.queue}>
      <span style={{ color: "darkblue", fontSize: "10px" }}>QUEUE</span>
    </div>
  );

  const StatusStub_DONE = (
    <div className={classes.done}>
      <DoneIcon style={{ color: "teal" }} />
    </div>
  );

  return (
    <div key={props.index}>
      <ListItem
        key={props.index}
        button
        style={{
          borderBottom: "0.5px solid #abababde",
          padding: "10px 15px"
        }}
        onClick={() => handleConcernData(props.data)}
      >
        <ListItemAvatar>
          <div>
            {props.data.user_status === 1 ? (
              <status-indicator
                positive
                pulse
                style={{
                  position: "absolute",
                  marginTop: "30px",
                  marginLeft: "35px"
                }}
              ></status-indicator>
            ) : (
              <status-indicator
                pulse
                style={{
                  position: "absolute",
                  marginTop: "30px",
                  marginLeft: "35px"
                }}
              ></status-indicator>
            )}
            <Avatar src={props.data.image}></Avatar>
          </div>
        </ListItemAvatar>
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
          {props.data.concern_status === 3 ? (
            ""
          ) : (
            <div>
              <MenuItem onClick={e => handleDone()}>Mark as Done</MenuItem>
              <MenuItem onClick={e => handleBackQueue()}>
                Back to Queue
              </MenuItem>
            </div>
          )}
        </Menu>
        <ListItemText
          primary={
            <Typography className={classes.name}>
              {props.data.first_name + " " + props.data.last_name}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                style={{
                  color: "#707070"
                }}
              >
                {props.data.concern_title}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <span
            style={{
              marginRight: "10px",
              color: "grey",
              fontSize: "10px"
            }}
          >
            5:00 PM
          </span>
          <Avatar
            variant="square"
            className={classes.small}
            style={{ background: "transparent" }}
          >
            {props.data.concern_status === 1 ? (
              <Avatar variant="square" src={Handshake} />
            ) : props.data.concern_status === 3 ? (
              StatusStub_DONE
            ) : (
              StatusStub_QUEUE
            )}
          </Avatar>

          {props.data.concern_status === 3 ? (
            ""
          ) : (
            <MoreVertIcon
              onClick={event => handleMenu(event, props.data)}
              style={{
                fontSize: 35,
                color: "#372476",
                cursor: "pointer"
              }}
            />
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline-block",
    overflow: " hidden",
    "text-overflow": "ellipsis",
    "white-space": " nowrap",
    width: "250px",
    fontWeight: "bold",
    "@media (max-width: 600px)": {
      display: "inline-block",
      overflow: " hidden",
      "text-overflow": "ellipsis",
      "white-space": " nowrap",
      width: "100px"
    }
  },
  queue: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "10px",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "1px solid lightgrey",
    borderTop: "10px solid #372476"
  },
  active: { backgroundColor: "pink" },
  done: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "10px",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "1px solid lightgrey",
    borderTop: "10px solid #372476"
  },
  name: {
    display: "inline-block",
    overflow: " hidden",
    "text-overflow": "ellipsis",
    "white-space": " nowrap",
    width: "250px",
    fontWeight: "bold",
    "@media (max-width: 600px)": {
      display: "inline-block",
      overflow: " hidden",
      "text-overflow": "ellipsis",
      "white-space": " nowrap",
      width: "100px"
    }
  }
}));
