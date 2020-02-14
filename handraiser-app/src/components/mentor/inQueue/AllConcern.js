import React, { useState, useEffect, useContext } from "react";
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
import "status-indicator/styles.css";
import io from "socket.io-client";
import { UserContext } from "../../Contexts/UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function InQueue({ class_id, search }) {
  const classes = useStyles();
  const [concernsData, setConcernsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { cstate, getData } = useContext(UserContext);

  const ENDPOINT = "localhost:5000";
  let socket = io(ENDPOINT);

  useEffect(() => {
    socket = io(ENDPOINT);

    if (!cstate) {
      getData();
    }

    if (cstate) {
      socket.emit("join", {
        username: cstate.user_id,
        room: class_id,
        image: ""
      });
    }

    update("");
  }, [ENDPOINT]);

  useEffect(() => {
    update(search);

    socket.on("updateComponents", message => {
      update("");
    });
  }, [search]);

  const update = data => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/classes/all/${class_id}?search=${data}`
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
                      borderLeft: "14px solid #8932a8",
                      borderBottom: "0.5px solid #abababde",
                      padding: "10px 15px",
                      backgroundColor: "whitesmoke"
                    }}
                    // onClick={() => handleConcernData(data)}
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
                            {data.first_name + " " + data.last_name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction style={{ display: "flex" }}>
                      <Avatar
                        variant="square"
                        className={classes.small}
                        style={{
                          backgroundColor: "#372476"
                        }}
                      >
                        <p style={{ fontSize: 12 }}>
                          {data.concern_status === 3
                            ? "Done"
                            : data.concern_status === 1
                            ? "Hot"
                            : "Queue"}
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
            })
          : ""}
      </List>
    </Paper>
  );
}
