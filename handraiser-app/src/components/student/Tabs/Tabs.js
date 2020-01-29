import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import InQueue from "../in_queue/in_queue";

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
const TabBtn = props => {
  const [tabValue, setTabValue] = useState(0);
  const [hide, setHide] = useState(false);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <React.Fragment>
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
            label="IN QUEUE"
            onClick={() => setHide(hide === false ? hide : !hide)}
          />
          <Tab
            label="CLOSED"
            onClick={() => setHide(hide === true ? hide : !hide)}
          />
          <Tab
            label="ALL"
            onClick={() => setHide(hide === true ? hide : !hide)}
          />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <InQueue />
      </TabPanel>
      <TabPanel value={tabValue} index={1}></TabPanel>
      <TabPanel value={tabValue} index={2}></TabPanel>
    </React.Fragment>
  );
};

export default TabBtn;
