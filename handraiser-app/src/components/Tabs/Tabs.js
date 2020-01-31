import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import axios from "axios";

import { TabBox, BtnBox } from "../Styles/Styles";

import { TableCont } from "../Table/Table";
import { GenerateKey } from "../Generate-Key/Generate";

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
      {value === index && <Box style={{ paddingTop: "20px" }}>{children}</Box>}
    </Typography>
  );
}

export const TabBtn = props => {
  const [tabValue, setTabValue] = useState(0);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [mentorData, setMentorData] = useState({});
  const [adminData, setAdminData] = useState({});

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMentor = e => {
    e.preventDefault();
    const Obj = {
      email: mentorData
    };
    axios
      .post(`http://localhost:5000/api/admin/keygen/mentor`, Obj)
      .then(() => {
        toast.info("registration sucessful!", {
          position: toast.POSITION.TOP_CENTER
        });
        setOpen(false);
      })
      .catch(err => {
        toast.error(err.respond.data.error, {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  const handleAdmin = e => {
    e.preventDefault();
    const Obj = {
      email: adminData
    };
    axios
      .post(`http://localhost:5001/api/admin/keygen`, Obj)
      .then(() => {
        toast.info("registration sucessful!", {
          position: toast.POSITION.TOP_CENTER
        });
        setOpen(false);
      })
      .catch(err => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER
        });
      });
    console.log(adminData);
  };

  return (
    <React.Fragment>
      <TabBox>
        <Paper color="primary">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
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
              label="Admins"
              onClick={() => setHide(hide === true ? hide : !hide)}
            />
          </Tabs>
        </Paper>
        {hide && (
          <BtnBox>
            {tabValue === 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(props)}
              >
                Generate Key
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(props)}
              >
                Generate Key
              </Button>
            )}
          </BtnBox>
        )}
      </TabBox>
      <TabPanel value={tabValue} index={0}>
        <TableCont tabValue={tabValue} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TableCont tabValue={tabValue} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <TableCont tabValue={tabValue} />
      </TabPanel>
      <GenerateKey
        handleClose={handleClose}
        open={open}
        handleMentor={handleMentor}
        setMentorData={setMentorData}
        handleAdmin={handleAdmin}
        setAdminData={setAdminData}
        tabValue={tabValue}
      />
    </React.Fragment>
  );
};
