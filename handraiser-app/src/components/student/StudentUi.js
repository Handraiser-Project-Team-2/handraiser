import React, { useState } from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";

import Tabs from "./Tabs/Tabs";

const Nav = styled.div`
  width: 100%;
  height: 6.5vh;
`;
const Div = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 93.5vh;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const Queue = styled.div`
  width: 35%;
`;
const Help = styled.div`
  display: flex;
  width: 65%;
  box-sizing: border-box;
  flex-direction: column;
`;
const Subject = styled.div`
  height: 15vh;
  background-color: #ffffff;
`;
const Conversation = styled.div`
  height: 75vh;
  background-color: #eaeaea;
`;
const Message = styled.div`
  display: flex;
  height: 20vh;
  background-color: #dddddd;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const TitleName = styled.div`
  height: 30vh;
  width: 95vh;
  background-color: #dddddd;
`;
const Field = styled.div``;

export default function Student() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
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
            </Menu>
          </Toolbar>
        </AppBar>
      </Nav>
      <Div>
        <Queue>
          <Tabs />
        </Queue>
        <Help>
          <Subject>
            <TitleName></TitleName>
          </Subject>
          <Conversation></Conversation>
          <Message>
            <Field>
              <TextField id="outlined-basic" variant="outlined" fullWidth />
            </Field>
          </Message>
        </Help>
      </Div>
    </React.Fragment>
  );
}
