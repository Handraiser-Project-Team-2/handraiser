import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Nav } from "../Styles/Styles";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
var jwtDecode = require("jwt-decode");
import { UserContext } from "../Contexts/UserContext";

export default function Topbar() {
  let history = useHistory();
  const [user, setUser] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [name, setName] = useState("");
  var decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  const user_id = decoded.userid;
  const { setData } = useContext(UserContext);

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
  };

  const sendMsg = evt => {
    evt.preventDefault();
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/userprofile/${user_id}`).then(res => {
      setUser(res.data[0].image);
    });
  }, []);

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
            <IconButton edge="start" aria-label="menu">
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
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
    </Nav>
  );
}
