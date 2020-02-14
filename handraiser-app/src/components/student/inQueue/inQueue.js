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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";

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
  var jwtDecode = require("jwt-decode");
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
  const ENDPOINT = "localhost:5000";

  let socket = io(ENDPOINT);
  const [initial, setInitial] = useState();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", {
      username: "Admin",
      room: props.classReference,
      image: ""
    });
  }, [ENDPOINT]);

  useEffect(() => {
    if (props.search || !concernsData) {
      update(props.search);
    }

    socket.on("updateComponents", message => {
      update("");
    });

    socket.on("consolidateRequest", message => {
      console.log("message recieved", message);
      update("");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected to server");
    });
  }, [props.search, ENDPOINT, concernsData]); //class_id

  const update = data => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/student/queue/order/${props.classReference}/${user_id}?search=${data}`
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
      .get(
        `http://localhost:5000/api/concern_list/${concern.concern.concern_id}`
      )
      .then(data => {
        axios
          .patch(
            `http://localhost:5000/api/concern_list/${data.data[0].concern_id}`,
            {
              concern_id: data.data[0].concern_id,
              concern_title: concernTitle,
              concern_description: concernDescription,
              concern_status: data.data[0].concern_status
            }
          )
          .then(data => {
            socket.emit("handshake", { room: props.classReference });
          })
          .catch(err => {
            console.log(err);
          });

        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConcernData = data => {
    props.rowDatahandler(data);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleRemoveReq = () => {
    setAnchorEl(null);

    // if (concern.concern) {
    axios
      .delete(
        `http://localhost:5000/api/student/request/${concern.concern.concern_id}`,
        {}
      )
      .then(data => {
        socket.emit("handshake", { room: props.classReference });

        // alert("Your concern has been removed from the queue");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Paper style={{ maxHeight: "830px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData
          ? concernsData.map((concern, index) => {
              return (
                <div key={index}>
                  <ListItem
                    style={{
                      borderLeft: "14px solid #8932a8",
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
                        Remove request
                      </MenuItem>
                      <MenuItem onClick={() => handleClickOpen()}>
                        Edit Request
                      </MenuItem>
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
                        style={
                          concern.concern.concern_status === 1
                            ? { background: "red" }
                            : concern.queue_order_num === 0
                            ? { background: "green" }
                            : { background: "blue" }
                        }
                      >
                        <p style={{ fontSize: 12 }}>
                          {concern.concern.concern_status === 1
                            ? "being helped"
                            : concern.queue_order_num === 0
                            ? "next"
                            : concern.queue_order_num}
                        </p>
                      </Avatar>
                      <MoreVertIcon
                        onClick={event => handleMenu(event, concern)}
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
