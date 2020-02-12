import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
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
  const [hide, setHide] = useState(false);
  const [search, setSearch] = useState("");
  const handleChange = (event, newValue) => {
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
              id="outlined-basic"
              placeholder="Search..."
              fullWidth
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </form>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="MY REQUESTS"
            onClick={() => setHide(hide === false ? hide : !hide)}
          />
          <Tab
            label="CLOSED"
            onClick={() => setHide(hide === true ? hide : !hide)}
          />
          <Tab
            label="ALL QUEUE"
            onClick={() => setHide(hide === true ? hide : !hide)}
          />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <InQueue
          rowDatahandler={props.rowDatahandler}
          classReference={props.classReference}
          search={search}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Done classReference={props.classReference} search={search} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <InQueueAll classReference={props.classReference} search={search} />
      </TabPanel>
    </React.Fragment>
  );
};

export default TabBtn;
