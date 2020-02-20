import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Handshake from "../../images/handshake.gif";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Paper } from "@material-ui/core";

import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import io from "socket.io-client";

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
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  next: {
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
  number: {
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

export default function InQueue(props) {
  const [concernsData, setConcernsData] = useState([]);

  const classes = useStyles();

  const { cstate, getData } = useContext(UserContext);

  const ENDPOINT = "172.60.62.113:5000";
  let socket = io(ENDPOINT);

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
    update(props.search);

    socket.on("updateComponents", message => {
      update("");
    });
  }, [props.search]); //class_id

  const update = data => {
    axios({
      method: "get",
      url: `/api/student/queue/order/${props.classReference}?search=${data}`
    }).then(res => {
      setConcernsData(res.data);
    });
  };

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData.map((concern, index) => {
          return (
            <div key={index}>
              <ListItem
                style={{
                  borderBottom: "0.5px solid #abababde",
                  padding: "10px 15px"
                }}
              >
                <ListItemAvatar>
                  <div>
                    {concern.concern.user_status === 1 ? (
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
                    <Avatar src={concern.concern.image}></Avatar>
                  </div>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography className={classes.name}>
                      {concern.concern.first_name +
                        " " +
                        concern.concern.last_name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                      >
                        {/* {name} */}
                        {concern.concern.concern_title}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction style={{ display: "flex" }}>
                  <Avatar
                    variant="square"
                    style={{
                      background: "transparent"
                    }}
                  >
                    <div>
                      {concern.concern.concern_status === 1 ? (
                        <Avatar variant="square" src={Handshake} />
                      ) : concern.queue_order_num == 0 ? (
                        <div className={classes.next}>
                          <span
                            style={{
                              color: "black",
                              fontSize: "10px"
                            }}
                          >
                            NEXT
                          </span>
                        </div>
                      ) : (
                        <div className={classes.number}>
                          <span
                            style={{
                              display: "flex",
                              color: "black",
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                              fontSize: "15px"
                            }}
                          >
                            {concern.queue_order_num}
                          </span>
                        </div>
                      )}
                    </div>
                  </Avatar>
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "grey",
                      fontSize: "10px"
                    }}
                  >
                    5:00 PM
                  </span>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })}
      </List>
    </Paper>
  );
}
