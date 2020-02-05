import React, { useState } from "react";
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
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function InQueue() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const datas = [
    {
      name: "Ali Connors",
      concern: "Error in docker-compose"
    },
    {
      name: "Alex Jennifer",
      concern: "Request 500 Node"
    },
    {
      name: "Uzumaki Naruto",
      concern: "Authentication Glitch"
    },
    {
      name: "Ali Connors",
      concern: "Error in docker-compose"
    },
    {
      name: "Alex Jennifer",
      concern: "Request 500 Node"
    },
    {
      name: "Uzumaki Naruto",
      concern: "Authentication Glitch"
    },
    {
      name: "Ali Connors",
      concern: "Error in docker-compose"
    },
    {
      name: "Alex Jennifer",
      concern: "Request 500 Node"
    },
    {
      name: "Uzumaki Naruto",
      concern: "Authentication Glitch"
    },
    {
      name: "Alex Jennifer",
      concern: "Request 500 Node"
    },
    {
      name: "Uzumaki Naruto",
      concern: "Authentication Glitch"
    }
  ];

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <List className={classes.root}>
        {datas.map((data, index) => {
          return (
            <div key={index}>
              <ListItem
                button
                style={{
                  borderLeft: "14px solid #8932a8",
                  borderBottom: "0.5px solid #abababde",
                  padding: "10px 15px"
                }}
              >
                <ListItemAvatar>
                  <Avatar>{data.name.charAt(0)}</Avatar>
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
                  primary={data.concern}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {data.name}
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
    </Paper>
  );
}
