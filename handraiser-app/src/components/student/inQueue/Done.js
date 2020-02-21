import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DoneIcon from "@material-ui/icons/Done";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography, Paper } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import { UserContext } from "../../Contexts/UserContext";

var jwtDecode = require("jwt-decode");

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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline",
    overflow: " hidden",
    "text-overflow": "ellipsis",
    "white-space": " nowrap",
    width: "250px",
    color: "grey",
    "@media (max-width: 600px)": {
      display: "inline-block",
      overflow: " hidden",
      "text-overflow": "ellipsis",
      "white-space": " nowrap",
      width: "120px",
      color: "grey"
    }
  },
  title: {
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

export default function InQueue(props) {
  const classes = useStyles();
  var decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;
  const [concernsData, setConcernsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [concern, setConcern] = useState("");
  const open = Boolean(anchorEl);

  const ENDPOINT = "172.60.62.113:5000";
  let socket = io(ENDPOINT);
  const { cstate, getData } = useContext(UserContext);

  useEffect(() => {
    socket = io(ENDPOINT);

    if (!cstate) {
      getData();
    }

    if (cstate) {
      socket.emit("join", {
        username: cstate.user_id,
        room: props.classReference,
        image: ""
      });
    }

    update("");
  }, [ENDPOINT]);

  useEffect(() => {
    if (props.search || !concernsData) {
      update(props.search);
    }

    socket.on("updateComponents", message => {
      update("");
    });
  }, [props.search]);

  const update = data => {
    axios({
      method: "get",
      url: `/api/student/done/order/${props.classReference}/${user_id}?search=${props.search}` //5 here is a class_id example
    }).then(res => {
      setConcernsData(res.data);
    });
  };

  const handleMenu = (event, concern) => {
    setConcern(concern);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConcernData = data => {
    setAnchorEl(null);

    props.rowDatahandler(data);
  };

  const handleRemoveReq = () => {
    setAnchorEl(null);

    if (concern) {
      axios
        .delete(`/api/student/request/${concern.concern.concern_id}`, {})
        .then(data => {
          socket.emit("handshake", { room: props.classReference });
        })
        .catch(err => {
          console.log(err);
        });
    }

    handleClose();
  };

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <ToastContainer />
      <List className={classes.root}>
        {concernsData.map((data, index) => {
          return (
            <div key={index}>
              <ListItem
                style={{
                  borderBottom: "0.5px solid #abababde",
                  padding: "10px 15px",
                  cursor: "pointer"
                }}
                onClick={() => handleConcernData(data)}
              >
                <ListItemAvatar>
                  <div>
                    {data.concern.user_status === 1 ? (
                      <StyledBadgeGreen
                        overlap="circle"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right"
                        }}
                        variant="dot"
                      >
                        <Avatar src={data.concern.image} />
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
                        <Avatar src={data.concern.image} />
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
                  <MenuItem onClick={() => handleRemoveReq()}>
                    Remove Request
                  </MenuItem>
                </Menu>
                <ListItemText
                  primary={
                    <Typography className={classes.title}>
                      {data.concern.concern_title}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                      >
                        {data.concern.concern_description}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction style={{ display: "flex" }}>
                  <div style={{ display: "flex", fontSize: 12 }}>
                    {data.concern.concern_status === 3 ? (
                      <span
                        style={{
                          border: "1px solid red",
                          padding: "5px",
                          borderRadius: "5px"
                        }}
                      >
                        <span style={{ color: "red" }}>Closed</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })}
      </List>
    </Paper>
  );
}
