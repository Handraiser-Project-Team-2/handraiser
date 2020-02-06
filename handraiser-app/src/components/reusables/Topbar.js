import React, { useState, useEffect, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Nav } from "../Styles/Styles";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export default function Topbar() {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [name, setName] = useState("");
  const { setData } = useContext(UserContext);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    sessionStorage.setItem("token", "");
    setData();
    history.push("/");
  };

  const sendMsg = evt => {
    evt.preventDefault();
    console.log(name);
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
              <AccountCircle style={{ fontSize: 40 }} />
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
