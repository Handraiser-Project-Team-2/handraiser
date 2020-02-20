import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InQueue from "../inQueue/inQueue";
import Done from "../inQueue/Done";
import AllConcern from "../inQueue/AllConcern";
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
          style={{
            background: "#372476",
            color: "white"
          }}
        >
          <Tab label="IN QUEUE" />
          <Tab label="CLOSED" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <InQueue
          rowDatahandler={props.rowDatahandler}
          class_id={props.class_id}
          search={search}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Done class_id={props.class_id} search={search} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <AllConcern class_id={props.class_id} search={search} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <AllConcern class_id={props.class_id} search={search} />
      </TabPanel>
    </React.Fragment>
  );
};

export default TabBtn;
