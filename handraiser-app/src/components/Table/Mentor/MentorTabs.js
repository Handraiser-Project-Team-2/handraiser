import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// COMPONENTS
import MentorProfile from "./MentorProfile";
import MentorClass from "./MentorClass";

const useStyles = makeStyles({
  tab: {
    color: "black"
  },
  root: {
    flexGrow: 1
  }
});

export default function MentorTabs({ profileData, classData }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
          style={{
            backgroundColor: "#372476",
            color: "white"
          }}
        >
          <Tab label="Profile" />
          <Tab label="Classes" />
        </Tabs>
      </Paper>

      {/* Tab Body */}
      {value === 0 ? (
        <MentorProfile profileData={profileData} classData={classData} />
      ) : (
        <MentorClass profileData={profileData} classData={classData} />
      )}
    </>
  );
}
