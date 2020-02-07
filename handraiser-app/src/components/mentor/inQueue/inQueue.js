import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import MentorUi from "../MentorUi";
import { useParams } from "react-router-dom";

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
  const open = Boolean(anchorEl);
  const rowDataHandlerChild2 = rowDatahandler.rowDatahandler.rowDatahandler;
  let { class_id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `/api/classes/queue/${class_id}` //5 here is a class_id example
    }).then(res => {
      setConcernsData(res.data);
    });
  });

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
              <ListItemAvatar>
                <Avatar>A</Avatar>
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

              <ListItemSecondaryAction onClick={handleMenu}>
                <MoreVertIcon
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
  );
}
