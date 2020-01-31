import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import { TabBtn } from "../Tabs/Tabs";

export default function NavBar() {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
<<<<<<< HEAD

<<<<<<< HEAD
=======
>>>>>>> 8760dccc9372f861b9a8bbbea67ee9f6d2df9109
  return (
    <React.Fragment>
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
            <Typography variant="h6">Handraiser Super Admin</Typography>
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
<<<<<<< HEAD
=======
=======
>>>>>>> 8760dccc9372f861b9a8bbbea67ee9f6d2df9109
  const user_type = sessionStorage.getItem("user_type");
  if (user_type !== 1) {
    Swal.fire({
      icon: "error",
      title: "You cannot acces this page!"
    }).then(function() {
      if (user_type === 3) {
        history.push("/student");
      } else if (user_type === 4) {
        history.push("/mentor");
      }
    });
  }

  if (user_type !== 1) {
    return null;
  } else {
    return (
      <React.Fragment>
        <AppBar style={{ backgroundColor: "#372476" }}>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between"
<<<<<<< HEAD
>>>>>>> cc3f6fc22721f757a34f7752e08e4b277a2090d7
=======
>>>>>>> 8760dccc9372f861b9a8bbbea67ee9f6d2df9109
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton edge="start" aria-label="menu">
                <MenuIcon style={{ color: "white" }} />
              </IconButton>
              <Typography variant="h6">Handraiser Admin</Typography>
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
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <div
          style={{ paddingTop: "100px", marginRight: "5%", marginLeft: "5%" }}
        >
          <TabBtn />
        </div>
      </React.Fragment>
    );
  }
}
