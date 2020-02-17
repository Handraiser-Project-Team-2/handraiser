import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useParams } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Drawer from "@material-ui/core/Drawer";
import { Nav } from "../Styles/Styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { UserContext } from "../Contexts/UserContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import InQueue from "../student/inQueue/inQueue";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import io from "socket.io-client";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  heading: {
    color: "black"
  }
}));

export default function Topbar() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [state, setState] = React.useState({
    left: false
  });
  var jwtDecode = require("jwt-decode");
  var decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  let history = useHistory();
  const [userProfile, setUserProfile] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user_id = decoded.userid;
  const { setData } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [tabValue, setTabValue] = useState(0);
  let { class_id } = useParams();

  const panelDrawer = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ENDPOINT = "172.60.62.208:5000";

  let socket = io(ENDPOINT);

  const toggleDrawer = (side, open) => event => {
    setState({ left: true, [side]: open });
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [className, setClassName] = React.useState("");

  useEffect(() => {
    axios({
      method: "post",
      url: `/api/classinfo/${class_id}`
    }).then(res => {
      setClassName(res.data[0].class_title);
    });
  }, []);

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, true)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List style={{ minWidth: 250, maxWidth: 400 }}>
        <ListItem
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            backgroundColor: "#372476",
            color: "white",
            padding: "10px"
          }}
        >
          <span style={{ marginLeft: "10px" }}> PROFILE INFORMATION</span>
          <div style={{ cursor: "pointer" }}>
            <CloseIcon onClick={toggleDrawer(side, false)} />
          </div>
        </ListItem>
        <Divider />
        <ListItem
          style={{
            display: "flex",
            justifyContent: "flex-start",

            alignContent: "flex-start",
            marginTop: "10px"
          }}
        >
          <Avatar className={classes.large} src={userProfile.image}></Avatar>
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <span style={{ marginTop: 10, fontWeight: "bold" }}>
              {userProfile.first_name + " " + userProfile.last_name}
            </span>
            <span style={{ marginTop: 10, marginBottom: 10, color: "grey" }}>
              {userProfile.email}
            </span>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={panelDrawer("panel1")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Classes</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {classData.map(classList => {
                    return (
                      <List key={classList.class_id}>
                        <ListItem
                          button
                          onClick={() => {
                            cardClick(classList.class_id);
                          }}
                        >
                          <ListItemText primary={classList.class_title} />
                        </ListItem>
                      </List>
                    );
                  })}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={panelDrawer("panel2")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>Requests</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      InQueue
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <List>
                          <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={event => handleListItemClick(event, 0)}
                          >
                            <ListItemText
                              primary="Request Title"
                              onClick={() => {
                                setTabValue(0);
                              }}
                            />
                          </ListItem>
                        </List>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      All
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <List>
                          <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={event => handleListItemClick(event, 0)}
                          >
                            <ListItemText
                              primary="Request Title"
                              onClick={() => {
                                setTabValue(1);
                              }}
                            />
                          </ListItem>
                        </List>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      Closed
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <List>
                          <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={event => handleListItemClick(event, 0)}
                          >
                            <ListItemText
                              primary="Request Title"
                              onClick={() => {
                                setTabValue(2);
                              }}
                            />
                          </ListItem>
                        </List>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </ListItem>
      </List>
    </div>
  );

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    sessionStorage.setItem("token", "");
    history.push("/");
    setData();

    axios
      .patch(`/api/users/${user_id}`)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!"
        });
      })
      .then(data => {
        socket.emit("user_activity", {});
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`/api/userprofile/${user_id}`).then(res => {
      setUserProfile(res.data[0]);
    });
  }, []);

  let token = sessionStorage.getItem("token").split(" ")[1];
  const [userType, setUserType] = useState();

  const changeUserType = e => {
    setUserType(e.data.user_type_id);
  };

  useEffect(() => {
    fetchUserData();
    userType === 3 ? fetchMyClass() : fetchMentorClass();
  }, [userType]);

  const [tokState] = useState({ token: token });

  const fetchUserData = () => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: tokState
    })
      .then(data => {
        setData(data.data);
        changeUserType(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [classData, setClassData] = useState([]);

  // get all class relative to this mentor(if user is verified)
  const fetchMentorClass = () => {
    axios({
      method: "post",
      url: `/api/my/classes`,
      data: tokState
    })
      .then(data => {
        setClassData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // get all class relative to student
  const fetchMyClass = () => {
    axios({
      method: "post",
      url: `/api/student/get/class`,
      data: tokState
    })
      .then(data => {
        // console.log(data.data);
        setClassData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cardClick = e => {
    if (userProfile.user_type_id === 3) {
      window.location = `/student/${e}`;
    }
    if (userProfile.user_type_id === 4) {
      window.location = `/mentor/${e}`;
    }
  };

  return (
    <Nav>
      <AppBar style={{ backgroundColor: "#372476" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
              {sideList("left")}
            </Drawer>
            <Typography variant="h6">Handraiser</Typography>
          </div>
          <div>
            <IconButton
              aria-label="account of current user"
              edge="end"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt="" src={userProfile.image} />
            </IconButton>
          </div>
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
            <MenuItem></MenuItem>

            <MenuItem>
              <GoogleLogout
                clientId="239954847882-ilomcrsuv3b0oke6tsbl7ofajjb11nkl.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={() => Logout()}
              ></GoogleLogout>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <ToastContainer autoClose={1500} />
    </Nav>
  );
}
