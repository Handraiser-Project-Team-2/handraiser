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
import Tabs from "./Tabs/Tabs";
const Nav = styled.div`
  width: 100%;
  padding-bottom: 65px;
`;
const Div = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  @media screen and (max-width: 600px) {
    box-sizing: border-box;
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
    box-sizing: border-box;
    width: 100%;
  }
`;
const Subject = styled.div`
  display: flex;
  background-color: #ffffff;
`;
const Conversation = styled.div`
  height: 63vh;
  background-color: #eaeaea;
`;
const Message = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  background-color: #dddddd;
`;
const TitleName = styled.div`
  padding: 20px;
  width: 85%;
  border-right: 1px solid lightgrey;
  background-color: #ffffff;
  @media screen and (max-width: 600px) {
    h4 {
      font-size: 20px;
    }
    h6 {
      font-size: 10px;
    }
  }
`;
const Field = styled.div`
  width: 100%;
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
  padding: 10px;
  margin-left: 25px;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    margin: 0 auto;
    width: 100%;
  }
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
              <Typography variant="h6">Handraiser Mentor</Typography>
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
              <Typography variant="h4">Error in Docker Compose</Typography>
              <Typography variant="h6">From: Ali Connors</Typography>
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
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%"
                }}
              >
                <TextField
                  id="outlined-textarea"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows="3"
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "15px"
                  }}
                >
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
