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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Tooltip from "@material-ui/core/Tooltip";

import Tabs from "./Tabs/Tabs";

const Nav = styled.div`
  width: 100%;
  height: 6.5vh;
`;
const Div = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 93.5vh;
  @media screen and (max-width: 600px) {
    justify-content: center;
    width: 100%;
  }
`;
const Div2 = styled.div`
  width: 25%;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const Queue = styled.div`
  width: 25%;
  border-right: 1px solid lightgrey;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const Help = styled.div`
  display: flex;
  width: 50%;
  box-sizing: border-box;
  flex-direction: column;
  border-right: 1px solid lightgrey;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Subject = styled.div`
  height: 10vh;
  display: flex;
  background-color: #ffffff;
`;
const Conversation = styled.div`
  height: 70vh;
  background-color: #eaeaea;
`;
const Message = styled.div`
  display: flex;
  justify-content: center;
  height: 20vh;
  background-color: #dddddd;
`;
const TitleName = styled.div`
  height: 15vh;
  width: 85%;
  border-right: 1px solid lightgrey;
  background-color: #ffffff;
`;
const Field = styled.div`
  justify-content: center;
`;
const Option = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  border-right: 1px solid lightgrey;
  width: 15%;
`;
const Shared = styled.div`
  display: flex;
  margin-top: 33px;
  padding-bottom: 33px;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
`;
const More = styled.button`
  border: transparent;
  background: transparent;
  cursor: pointer;
`;
const Send = styled.button`
  background-color: #2fdc5f;
  color: white;
  border: transparent;
  width: 218px;
  height: 37px;
  margin-left: 25px;
  border-radius: 5px;
  cursor: pointer;
`;
const Request = styled.button`
  background-color: #372476;
  color: white;
  border: transparent;
  width: 218px;
  height: 37px;
  border-radius: 5px;
  cursor: pointer;
`;
const Attach = styled.button`
  border: transparent;
  background: transparent;
`;

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
            <TitleName>
              <div
                style={{
                  marginTop: 15,
                  paddingLeft: 50
                }}
              >
                <Typography variant="h4">Error in Docker Compose</Typography>
                <Typography variant="h6">From: Kobe Bryant</Typography>
              </div>
            </TitleName>
            <Option>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%"
                }}
              >
                <More onClick={handleMenu}>
                  <MoreVertIcon
                    style={{
                      fontSize: 35,
                      color: "#c4c4c4"
                    }}
                  />
                </More>
              </div>
            </Option>
          </Subject>
          <Conversation></Conversation>
          <Message>
            <Field>
              <div
                style={{
                  marginTop: 20
                }}
              >
                <TextField
                  id="outlined-textarea"
                  multiline
                  variant="outlined"
                  rows="3"
                  style={{
                    width: 800
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px"
                }}
              >
                <div>
                  <Tooltip title="Attach files">
                    <Attach onClick={handleMenu}>
                      <AttachFileIcon
                        style={{
                          fontColor: "lightgrey"
                        }}
                      />
                    </Attach>
                  </Tooltip>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "flex-end"
                  }}
                >
                  <Request>NEW REQUEST</Request>
                  <Send>SEND</Send>
                </div>
              </div>
            </Field>
          </Message>
        </Help>
        <Div2>
          <Shared>
            <Typography variant="h6">Shared Files</Typography>
          </Shared>
        </Div2>
      </Div>
    </React.Fragment>
  );
}
