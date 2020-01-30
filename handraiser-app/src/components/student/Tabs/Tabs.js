import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import InQueue from "../inQueue/inQueue";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "35%",
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

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
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <React.Fragment>
      <Paper color="primary" style={{ height: "83px" }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="IN QUEUE"
            onClick={() => setHide(hide === false ? hide : !hide)}
            style={{ width: "2px" }}
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
