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
import { StudentTable } from "../Table-Student/Table-student";
import { GenerateKey } from "../Generate-Key/Generate";

export const TabBtn = props => {
  const [tabValue, setTabValue] = useState(0);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [type, setType] = useState("");

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
        {value === index && (
          <Box style={{ paddingTop: "20px" }}>{children}</Box>
        )}
      </Typography>
    );
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOnChange = (e, tab) => {
    setUserData({ [e.target.name]: e.target.value });
    if (tab === 1) {
      setType("mentor");
    } else {
      setType("admin");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    axios
      .post(`http://localhost:5000/api/admin/keygen`, { ...userData, type })
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
  };

  return (
    <React.Fragment>
      <TabBox>
        <Paper color="primary">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
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
                value="admin"
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
        <StudentTable tabValue={tabValue} />
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
        handleAdd={handleAdd}
        setUserData={setUserData}
        setType={setType}
        handleOnChange={handleOnChange}
        tabValue={tabValue}
      />
    </React.Fragment>
  );
};
