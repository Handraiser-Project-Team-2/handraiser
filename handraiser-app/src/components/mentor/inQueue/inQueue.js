import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { conformToMask } from "react-text-mask";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  active: { backgroundColor: "pink" }
}));

export default function InQueue(rowDatahandler) {
  const classes = useStyles();
  const [concernsData, setConcernsData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState("");
  const [load, setLoad] = useState(false);
  const [color, setColor] = useState("red");
  const [selectedIndex, setSelectedIndex] = useState();
  const open = Boolean(anchorEl);
  const ENDPOINT = "localhost:5000";
  let socket = io(ENDPOINT);

  const rowDataHandlerChild2 = rowDatahandler.rowDatahandler;

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", {
      username: "Admin",
      room: rowDatahandler.class_id,
      image: ""
    });
  }, [ENDPOINT]);

  useEffect(() => {
    console.log(rowDatahandler.class_id);

    if (rowDatahandler.search || !concernsData) {
      update(rowDatahandler.search);
    }

    socket.on("updateComponents", message => {
      update("");
    });

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
      setConcernsData(concern_b);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected to server");
    });
  }, [rowDatahandler.search, ENDPOINT, concernsData]);

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

  const handleConcernData = (data, index) => {
    rowDataHandlerChild2(data);
    setSelectedIndex(index);
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
                    selected={selectedIndex === index}
                    style={
                      data.concern_status === 1
                        ? {
                            borderLeft: "10px solid #8932a8",
                            borderBottom: "0.5px solid #abababde",
                            padding: "10px 15px"
                          }
                        : {
                            borderLeft: "10px solid blue",
                            borderBottom: "0.5px solid #abababde",
                            padding: "10px 15px"
                          }
                    }
                    onClick={() => handleConcernData(data, index)}
                  >
                    <ListItemAvatar>
                      <div>
                        {data.user_status === 1 ? (
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
                        <Avatar src={data.image}></Avatar>
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
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
                    <ListItemText
                      primary={data.concern_title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {data.concern_description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction style={{ display: "flex" }}>
                      <Avatar variant="square" className={classes.small}>
                        <p style={{ fontSize: 12 }}>
                          {data.concern_status == 1 ? "Hot" : "Queue"}
                        </p>
                      </Avatar>
                      <MoreVertIcon
                        // onClick={handleMenu}
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
            })
          : ""}
      </List>
    </Paper>
  );
}
