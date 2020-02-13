import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Paper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import io from "socket.io-client";
import { UserContext } from "../../Contexts/UserContext";

var jwtDecode = require("jwt-decode");

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function InQueue(props) {
  const classes = useStyles();
  var decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;
  const [concernsData, setConcernsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState("");
  const open = Boolean(anchorEl);
  const ENDPOINT = "localhost:5000";
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
      url: `http://localhost:5000/api/student/done/order/${props.classReference}/${user_id}?search=${props.search}` //5 here is a class_id example
    }).then(res => {
      setConcernsData(res.data);
    });
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConcernData = data => {
    props.rowDatahandler(data);
  };

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData.map((data, index) => {
          return (
            <div key={index}>
              <ListItem
                style={{
                  borderLeft: "14px solid #8932a8",
                  borderBottom: "0.5px solid #abababde",
                  padding: "10px 15px",
                  backgroundColor: "whitesmoke",
                  cursor: "pointer"
                }}
                onClick={() => handleConcernData(data)}
              >
                <ListItemAvatar>
                  <Avatar src={data.concern.image}></Avatar>
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
                  <MenuItem onClick={handleClose}>Remove Request</MenuItem>
                </Menu>
                <ListItemText
                  primary={data.concern.concern_title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {data.concern.concern_description}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction style={{ display: "flex" }}>
                  <Avatar
                    variant="square"
                    className={classes.small}
                    style={{
                      backgroundColor: "forestgreen"
                    }}
                  >
                    <p style={{ fontSize: 12 }}>
                      {data.concern.concern_status === 3 ? "Done" : ""}
                    </p>
                  </Avatar>
                  <MoreVertIcon
                    onClick={handleMenu}
                    style={{
                      fontSize: 35,
                      color: "#c4c4c4",
                      cursor: "pointer"
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })}
      </List>
    </Paper>
  );
}
