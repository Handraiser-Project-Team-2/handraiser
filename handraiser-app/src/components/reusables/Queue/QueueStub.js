import React, { useState, useContext } from "react";
import Handshake from "../../images/handshake.gif";
import Badge from "@material-ui/core/Badge";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from "sweetalert2";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import { UserContext } from "../../Contexts/UserContext";

const StyledBadgeGreen = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);
const StyledBadgeGrey = withStyles(theme => ({
  badge: {
    backgroundColor: "lightgrey",
    color: "lightgrey",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""'
    }
  }
}))(Badge);

export default function QueueStub(props) {
  const { socket } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [concern, setConcern] = useState("");
  const classes = useStyles();
  const open = Boolean(anchorEl);

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
    // if (props.setRoom) {
    props.setRoom(data.concern_id);
    // }

  };

  const handleBackQueue = () => {
    setAnchorEl(null);
    // props.setSelection(false)
    props.rowDatahandler.setSelection(false);

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

    setTimeout(() => {
      props.setSelection(false);
      props.closeFlag();
    }, 350);

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
            socket.emit("handshake", {
              room: props.rowDatahandler.class_id
            });
          }).catch(err=>{
            console.log(err)
          })
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
              <StyledBadgeGreen
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                variant="dot"
              >
                <Avatar src={props.data.image} />
              </StyledBadgeGreen>
            ) : (
              <StyledBadgeGrey
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                variant="dot"
              >
                <Avatar src={props.data.image} />
              </StyledBadgeGrey>
            )}
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
    "@media (max-width: 900px)": {
      display: "inline-block",
      overflow: " hidden",
      "text-overflow": "ellipsis",
      "white-space": " nowrap",
      width: "150px",
      color: "grey"
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
