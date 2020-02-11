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
  const [concernsData, setConcernsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState("");
  const [load, setLoad] = useState(false);
  const open = Boolean(anchorEl);

  const rowDataHandlerChild2 = rowDatahandler.rowDatahandler;

  useEffect(() => {
    update(rowDatahandler.search);
  }, [rowDatahandler.search]);

  // here
  const update = data => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/classes/queue/${rowDatahandler.class_id}?search=${data}`
    })
      .then(res => {
        // console.log(res.data)
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
    rowDataHandlerChild2(data);
  };

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData.map((data, index) => {
          return (
            <div key={index}>
              <ListItem
                button
                style={{
                  borderLeft: "14px solid #8932a8",
                  borderBottom: "0.5px solid #abababde",
                  padding: "10px 15px"
                }}
                onClick={() => handleConcernData(data)}
              >
                <status-indicator
                  positive
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    marginTop: "15px",
                    marginLeft: "30px"
                  }}
                ></status-indicator>
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
        })}
      </List>
    </Paper>
  );
}
