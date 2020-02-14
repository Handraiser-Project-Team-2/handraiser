import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import { Nav } from "../Styles/Styles";
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

var jwtDecode = require("jwt-decode");

export default function Topbar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  var jwtDecode = require("jwt-decode");
  var decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  let history = useHistory();
  const [user, setUser] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user_id = decoded.userid;
  const { setData } = useContext(UserContext);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
    axios.patch(`http://localhost:5000/api/users/${user_id}`).then(res => {
      Swal.fire({
        icon: "success",
        title: "Logged out successful!"
      });
    });
  };

  const sendMsg = evt => {
    evt.preventDefault();
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/userprofile/${user_id}`).then(res => {
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
          <div>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>

            <MenuItem>
              {" "}
              <GoogleLogout
                clientId="239954847882-ilomcrsuv3b0oke6tsbl7ofajjb11nkl.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={Logout}
              ></GoogleLogout>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <ToastContainer autoClose={1500} />
    </Nav>
  );
}
