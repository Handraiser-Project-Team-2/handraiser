import React, { useState, useEffect } from "react";
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
import axios from "axios";

import { TabBtn } from "../Tabs/Tabs";

export default function NavBar() {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({ user_type: "" });
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("/api/user/data", {
          token: sessionStorage.getItem("token").split(" ")[1]
        })
        .then(data => {
          setState({ user_type: data.data.user_type_id });
          const user_type = data.data.user_type_id;
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
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "You cannot acces this page!"
      }).then(function() {
        history.push("/");
      });
    }
  }, []);

  if (state.user_type === 1) {
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
  }else{
    return ''
  }
}
