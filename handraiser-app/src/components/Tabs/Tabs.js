import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { TabBox, BtnBox } from "../Styles/Styles";

import { UserList } from "../List/List";
import { TableCont } from "../Table/Table";
import { GenerateKey } from "../Generate-Key/Generate";
// var jwtDecode = require("jwt-decode");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box style={{ paddingTop: "50px" }}>{children}</Box>}
    </Typography>
  );
}

export const TabBtn = props => {
  // const decoded = jwtDecode(sessionStorage.getItem("token").split(" ")[1]);
  // const user_id = decoded.userid;
  const [tabValue, setTabValue] = useState(0);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [type, setType] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [key, setKey] = useState("");
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: {
        token: sessionStorage.getItem("token")
      }
    })
      .then(res => {
        setAdminEmail(res.data.email);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const handleOnChange = e => {
    let email = e.target.name;
    let value = e.target.value;
    userData[email] = value;
    setUserData(userData);
    setType("mentor");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpenConfirm(true);
    axios
      .post(`/api/admin/keygen`, { ...userData, type })
      .then(res => {
        setEmailTo(res.data.data.validation_email);
        setKey(res.data.data.validation_key);
        setOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirm = () => {
    axios.post(`/api/sendMail`, {
      emailTo: emailTo,
      key: key,
      adminEmail: adminEmail,
      adminPass: adminPass
    });
    toast.success(
      "Registration successful! Verification Key sent to the mentor!",
      {
        position: toast.POSITION.TOP_RIGHT
      }
    );
    setOpenConfirm(false);
  };

  return (
    <React.Fragment>
      <TabBox>
        <Paper color="primary">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            style={{ backgroundColor: "#372476", color: "white" }}
          >
            <Tab
              label="Students"
              onClick={() => setHide(hide === false ? hide : !hide)}
            />
            <Tab
              label="Mentors"
              onClick={() => setHide(hide === true ? hide : !hide)}
            />
            <Tab
              label="Classes"
              onClick={() => setHide(hide === false ? hide : !hide)}
            />
          </Tabs>
        </Paper>
        {hide && (
          <BtnBox>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen(props)}
            >
              Add Mentor
            </Button>
          </BtnBox>
        )}
      </TabBox>

      <TabPanel value={tabValue} index={0}>
        <UserList />
        <TableCont tabValue={tabValue} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <UserList />
        <TableCont tabValue={tabValue} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <UserList />
        <TableCont tabValue={tabValue} />
      </TabPanel>
      <GenerateKey
        handleClose={handleClose}
        open={open}
        handleAdd={handleAdd}
        setUserData={setUserData}
        setType={setType}
        handleOnChange={handleOnChange}
        tabValue={tabValue}
      />
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Password Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Confirm Password for {adminEmail}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Password"
            type="password"
            fullWidth
            onChange={e => setAdminPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirm()} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer autoClose={1500} />
    </React.Fragment>
  );
};
