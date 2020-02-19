import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Drawer from "@material-ui/core/Drawer";
import { Nav } from "../../Styles/Styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { UserContext } from "../Contexts/UserContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Divider, Tooltip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClassIcon from "@material-ui/icons/Class";
import CloseIcon from "@material-ui/icons/Close";

import io from "socket.io-client";

var jwtDecode = require("jwt-decode");

const useStyles = makeStyles(theme => ({
  tab: {
    flexGrow: 1,
    width: "300px"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  heading: {
    color: "black"
  },
  details: {
    "@media (min-width: 1440px)": {
      display: "none"
    }
  },
  members: {
    "@media (min-width: 1440px)": {
      display: "none"
    }
  },
  requests: {
    "@media (min-width: 770px)": {
      display: "none"
    }
  }
}));

export default function Topbar({ showDiv }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [state, setState] = React.useState({
    left: false
  });
  var jwtDecode = require("jwt-decode");
  var decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  let history = useHistory();
  const [user, setUser] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user_id = decoded.userid;
  const { setData } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [hide, setHide] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }

  const panelDrawer = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ENDPOINT = "172.60.62.113:5000";

  let socket = io(ENDPOINT);

  const toggleDrawer = (side, open) => event => {
    setState({ left: true, [side]: open });
  };

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
          <div>
            <CloseIcon />
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
          <Avatar className={classes.large}></Avatar>
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <span style={{ marginTop: 10, fontWeight: "bold" }}>
              Lebron James
            </span>
            <span style={{ marginTop: 10, marginBottom: 10, color: "grey" }}>
              Lbj@gmail.com
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
                  Shooting Drills
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={panelDrawer("panel3")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                className={classes.details}
              >
                <Typography className={classes.heading}>
                  Class Details
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <span style={{ fontWeight: "bold", marginBottom: "10px" }}>
                    Name:{" "}
                  </span>
                  <span style={{ fontWeight: "bold", marginBottom: "10px" }}>
                    Description:{" "}
                  </span>
                  <span style={{ fontWeight: "bold" }}>Date Created: </span>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel4"}
              onChange={panelDrawer("panel4")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel3a-header"
                className={classes.members}
              >
                <Typography className={classes.heading}>
                  Class Members
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      marginBottom: "10px",
                      marginRight: "10px"
                    }}
                  >
                    Lebron James
                  </span>
                  <Status-indicator
                    positive
                    style={{ marginTop: "10px", marginTop: "5px" }}
                  ></Status-indicator>
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
      setUser(res.data[0].image);
    });
  });

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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              aria-label="account of current user"
              edge="end"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt="" src={user} />
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
