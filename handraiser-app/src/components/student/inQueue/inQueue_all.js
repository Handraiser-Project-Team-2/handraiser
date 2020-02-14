import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Handshake from "../../images/handshake.gif";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Paper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
var jwtDecode = require("jwt-decode");

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

export default function InQueue(props) {
  const [concernsData, setConcernsData] = useState([]);

  const classes = useStyles();

  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/student/queue/order/${props.classReference}?search=${props.search}` //5 here is a class_id example
    }).then(res => {
      setConcernsData(res.data);
    });
  }, [props.search]); //class_id

  //   console.log(concernsData);
  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData.map((concern, index) => {
          return (
            <div key={index}>
              <ListItem
                style={{
                  borderBottom: "0.5px solid #abababde",
                  padding: "10px 15px",
                  backgroundColor: "whitesmoke"
                }}
              >
                <ListItemAvatar>
                  <Avatar src={concern.concern.image}></Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography style={{ fontWeight: "bold" }}>
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
                        style={{
                          color: "grey"
                        }}
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
                            style={{
                              color: "black",
                              fontSize: "10px"
                            }}
                          >
                            NEXT
                          </span>
                        </div>
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
                          <span style={{ color: "black" }}>
                            <span
                              style={{
                                display: "flex",
                                color: "black",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center"
                              }}
                            >
                              {concern.queue_order_num}
                            </span>
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
