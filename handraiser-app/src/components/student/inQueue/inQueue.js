import React, { useState, useEffect, useContext } from "react";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "../../Contexts/UserContext";
import {  ToastContainer } from "react-toastify";
import Button from "@material-ui/core/Button";


export default function InQueue(props) {
  var jwtDecode = require("jwt-decode");
  const { socket } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [concernsData, setConcernsData] = useState();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [concernTitle, setConcernTitle] = useState("");
  const [concernDescription, setConcernDescription] = useState("");
  const open = Boolean(anchorEl);
  const [concern, setConcern] = useState("");

  const classes = useStyles();

  const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;

  useEffect(() => {
    socket.emit("join", {
      username: "Admin",
      room: props.classReference
    });

    socket.on("updateComponents", message => {
      update("");
    });

    socket.on("consolidateRequest", message => {
      update("");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected to server");
    });

  }, []);

  useEffect(() => {
    if (props.search || !concernsData) {
      update(props.search);
    }
    
  }, [props.search, concernsData]); //class_id

  const update = data => {
    axios({
      method: "get",
      url: `/api/student/queue/order/${props.classReference}/${user_id}?search=${data}`
    }).then(res => {
      setConcernsData(res.data);
    });
  };

  const handleMenu = (event, concern) => {
    setConcern(concern);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpenEdit(true);
    setConcernTitle(concern.concern.concern_title);
    setConcernDescription(concern.concern.concern_description);
  };

  const handleSaveEdit = () => {
    setOpenEdit(false);
    axios
      .get(`/api/concern_list/${concern.concern.concern_id}`)

      .then(data => {
        axios
          .patch(`/api/concern_list/${data.data[0].concern_id}`, {
            concern_id: data.data[0].concern_id,
            concern_title: concernTitle,
            concern_description: concernDescription,
            concern_status: data.data[0].concern_status
          })
          .then(data => {
            socket.emit("handshake", { room: props.classReference });
          })
          .catch(err => {
            console.log(err);
          });
      })

      .catch(err => {
        console.log(err);
      });
  };

  const handleConcernData = data => {
    props.setConcernSelection(true);
    props.rowDatahandler(data);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleRemoveReq = () => {

    setAnchorEl(null);

    setTimeout(() => {
      props.setConcernSelection(false);
      setConcernTitle("");
      setConcernDescription("");
      props.closeFlag();
    
      axios
        .patch(`/api/student/request/${concern.concern.concern_id}`, {})
        .then(data => {
          socket.emit("handshake", { room: props.classReference });
        })
        .catch(err => {
          console.log(err);
        });
    }, 350);
  };

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <ToastContainer />
      <List className={classes.root}>
        {concernsData
          ? concernsData.map((concern, index) => {
              return (
                <div key={index}>
                  <ListItem
                    style={{
                      borderBottom: "0.5px solid #abababde",
                      padding: "10px 15px",
                      cursor: "pointer"
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onClick={() => handleConcernData(concern)}
                  >
                    <ListItemAvatar>
                      <div>
                        {concern.concern.user_status === 1 ? (
                          <StyledBadgeGreen
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right"
                            }}
                            variant="dot"
                          >
                            <Avatar src={concern.concern.image} />
                          </StyledBadgeGreen>
                        ) : (
                          <StyledBadgeGrey
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right"
                            }}
                            variant="dot"
                          >
                            <Avatar src={concern.concern.image} />
                          </StyledBadgeGrey>
                        )}
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
                      <MenuItem onClick={() => handleRemoveReq()}>
                        Close
                      </MenuItem>
                      <MenuItem onClick={() => handleClickOpen()}>
                        Edit Request
                      </MenuItem>
                    </Menu>

                    <ListItemText
                      primary={
                        <Typography className={classes.title}>
                          {concern.concern.concern_title}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {concern.concern.concern_description}
                          </Typography>

                          {/* ----------------------dialog------------------- */}
                          <Dialog
                            open={openEdit}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                          >
                            <DialogTitle id="form-dialog-title">
                              Edit request
                            </DialogTitle>
                            <DialogContent>
                              <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Concern Title"
                                type="text"
                                fullWidth
                                value={concernTitle}
                                onChange={e => setConcernTitle(e.target.value)}
                              />
                              <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Concern Description"
                                type="text"
                                fullWidth
                                value={concernDescription}
                                onChange={e =>
                                  setConcernDescription(e.target.value)
                                }
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseEdit} color="primary">
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleSaveEdit()}
                                color="primary"
                              >
                                Save
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      }
                    />

                    <ListItemSecondaryAction style={{ display: "flex" }}>
                      <Avatar
                        variant="square"
                        style={{ background: "transparent" }}
                      >
                        <div>
                          {concern.concern.concern_status === 1 ? (
                            <Avatar variant="square" src={Handshake} />
                          ) : concern.queue_order_num === 0 ? (
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
                      <MoreVertIcon
                        onClick={event => handleMenu(event, concern)}
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

const StyledBadgeGreen = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);
const StyledBadgeGrey = withStyles(theme => ({
  badge: {
    backgroundColor: "lightgrey",
    color: "lightgrey",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""'
    }
  }
}))(Badge);

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
    width: "300px",
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
  title: {
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
