import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
  const [concern, setConcern] = useState("");
  const open = Boolean(anchorEl);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/student/done/order/${props.classReference}/${user_id}?search=${props.search}` //5 here is a class_id example
    }).then(res => {
      setConcernsData(res.data);
    });
  }, [props.search]);

  const handleMenu = (event, concern) => {
    setConcern(concern);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemoveReq = concern => {
    setConcern(concern);
    axios
      .delete(
        `http://localhost:5000/api/student/request/${concern.concern_id}`,
        {}
      )
      .then(() => {
        window.location = `/student/${props.classReference}`;
        toast.info("Your concern has been removed from the queue");
      });
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
                  backgroundColor: "whitesmoke"
                }}
                // onClick={() => handleConcernData(data)}
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
                  <MenuItem onClick={() => handleRemoveReq()}>
                    Remove Request
                  </MenuItem>
                </Menu>
                <ListItemText
                  primary={
                    <Typography style={{ fontWeight: "bold" }}>
                      {data.concern.concern_title}
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
                      background: "transparent"
                    }}
                  >
                    <div style={{ fontSize: 12 }}>
                      {data.concern.concern_status === 3 ? (
                        <DoneIcon style={{ color: "teal" }} />
                      ) : (
                        ""
                      )}
                    </div>
                  </Avatar>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    style={{ marginTop: "-5px" }}
                    onClick={() => handleRemoveReq(data.concern)}
                  >
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })}
      </List>
    </Paper>
  );
}
