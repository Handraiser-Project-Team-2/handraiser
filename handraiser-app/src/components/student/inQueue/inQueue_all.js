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
  const [anchorEl, setAnchorEl] = useState(null);
  const [concernsData, setConcernsData] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
                  borderLeft: "14px solid #8932a8",
                  borderBottom: "0.5px solid #abababde",
                  padding: "10px 15px"
                }}
              >
                <ListItemAvatar>
                  <Avatar src={concern.concern.image}></Avatar>
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
                  primary={concern.concern.concern_title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {/* {name} */}
                        {concern.concern.concern_description}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction style={{ display: "flex" }}>
                  <Avatar variant="square">
                    <p style={{ fontSize: 12 }}>
                      {concern.concern.concern_status == 1
                        ? "being helped"
                        : concern.queue_order_num == 0
                        ? "next"
                        : concern.queue_order_num}
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
