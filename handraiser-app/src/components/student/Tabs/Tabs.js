import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InQueue from "../inQueue/inQueue";
import InQueueAll from "../inQueue/inQueue_all";
import Done from "../inQueue/Done";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({}));

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
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

const TabBtn = props => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  const handleChange = (event, newValue) => {
    props.tabActivity(newValue)
    props.closeFlag();
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <Paper color="primary" style={{ height: "83px" }}>
        <form className={classes.search} noValidate autoComplete="off">
          <div
            style={{
              padding: "2px",
              marginLeft: "13px",
              marginRight: "13px"
            }}
          >
            <TextField
              id="outlined-basic3"
              placeholder="Search"
              fullWidth
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </form>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          style={{
            background: "#372476",
            color: "white"
          }}
        >
          <Tab label="MY REQUESTS" />
          <Tab label="CLOSED" />
          <Tab label="ALL QUEUE" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <InQueue
          rowDatahandler={props.rowDatahandler}
          classReference={props.classReference}
          search={search}
          closeFlag={props.closeFlag}
          setConcernSelection={props.setConcernSelection}
          concernSelection={props.concernSelection}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Done
          rowDatahandler={props.rowDatahandler}
          classReference={props.classReference}
          search={search}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <InQueueAll classReference={props.classReference} search={search} />
      </TabPanel>
    </React.Fragment>
  );
};

export default TabBtn;
