import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Handshake from "../../images/handshake.gif";
import { Typography, Paper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import io from "socket.io-client";
import { conformToMask } from "react-text-mask";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function InQueue(rowDatahandler) {
  const classes = useStyles();
  const [concernsData, setConcernsData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState("");
  const [load, setLoad] = useState(false);
  const open = Boolean(anchorEl);
  let socket;
  const ENDPOINT = "localhost:5000";

  const rowDataHandlerChild2 = rowDatahandler.rowDatahandler;

  // let socket = io("ws://localhost:5000", { transports: ["websocket"] });
  // const [initial, setInitial] = useState(true);
  useEffect(() => {
    socket = io(ENDPOINT);

    // update(rowDatahandler.search);

    // if (initial) {
    socket.emit("join", {
      username: "Admin",
      room: rowDatahandler.class_id,
      image: ""
    });
    // }

    if (rowDatahandler.search || !concernsData) {
      update(rowDatahandler.search);
    }

    socket.on("consolidateRequest", message => {
      console.log("message recieved", message);

      let trasmission = {
        concern_id: message.concern_id,
        concern_title: message.concern_title,
        concern_description: message.concern_description,
        concern_status: message.concern_status,
        class_id: message.class_id,
        user_id: message.user_id,
        profile_id: message.cstate.profile_id,
        first_name: message.cstate.first_name,
        last_name: message.cstate.last_name,
        image: message.cstate.image
      };

      let concern_b = Object.assign([], concernsData);

      concern_b.push(trasmission);

      console.log(concern_b);
      setConcernsData(concern_b);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected to server");
    });
  }, [rowDatahandler.search, ENDPOINT, concernsData]);

  // here
  const update = data => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/classes/queue/${rowDatahandler.class_id}?search=${data}`
    })
      .then(res => {
        setConcernsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConcernData = data => {
    console.log("here");
    rowDataHandlerChild2(data);
  };

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData
          ? concernsData.map((data, index) => {
              return (
                <div key={index}>
                  <ListItem
                    button
                    style={{
                      borderBottom: "0.5px solid #abababde",
                      padding: "10px 15px",
                      backgroundColor: "whitesmoke"
                    }}
                    onClick={() => handleConcernData(data)}
                  >
                    <ListItemAvatar>
                      <Avatar src={data.image}></Avatar>
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
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
                    <ListItemText
                      primary={
                        <Typography style={{ fontWeight: "bold" }}>
                          {data.first_name + " " + data.last_name}
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
                            {data.concern_title}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction style={{ display: "flex" }}>
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
                        {data.concern_status == 1 ? (
                          <Avatar variant="square" src={Handshake} />
                        ) : (
                          <div
                            style={{
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
                            }}
                          >
                            <span
                              style={{ color: "darkblue", fontSize: "10px" }}
                            >
                              QUEUE
                            </span>
                          </div>
                        )}
                      </Avatar>
                      <MoreVertIcon
                        // onClick={handleMenu}
                        style={{
                          fontSize: 35,
                          color: "#372476",
                          cursor: "pointer"
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })
          : ""}
      </List>
    </Paper>
  );
}
