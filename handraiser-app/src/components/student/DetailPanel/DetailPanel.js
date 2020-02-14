import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Shared, Div2 } from "../../Styles/Styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import James from "../../images/1966.png";
import DescriptionIcon from "@material-ui/icons/Description";
import { Avatar, ListItemText, ListItem } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Div2>
      <Shared>
        <Typography variant="h6">About this Class</Typography>
      </Shared>
      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          style={{ backgroundColor: "white" }}
        >
          <HelpOutlineIcon
            style={{
              marginRight: "15px",
              color: "#372476"
            }}
          />
          <Typography>Details</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ padding: "5px 10px 5px 10px", color: "grey" }}>
              Name
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 10px 5px 5px"
              }}
            >
              <LockIcon />
              <span>Name of Group</span>
            </span>
            <span style={{ padding: "25px 10px 5px 10px", color: "grey" }}>
              Description
            </span>
            <span style={{ padding: "10px 10px 8px 9px", color: "darkblue" }}>
              Set a class description
            </span>
            <span style={{ padding: "25px 10px 5px 10px", color: "grey" }}>
              Created
            </span>
            <span style={{ padding: "10px 10px 8px 9px" }}>
              Created by Lebron James
            </span>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          style={{ backgroundColor: "white" }}
        >
          <PeopleOutlineIcon
            style={{
              marginRight: "15px",
              color: "forestgreen"
            }}
          />
          <Typography>Members</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <ListItem>
              <Avatar
                src={James}
                style={{
                  marginLeft: "-17px"
                }}
              ></Avatar>
              <span
                style={{
                  marginLeft: "8px",
                  fontWeight: "bold"
                }}
              >
                Lebron James
              </span>
              <status-indicator
                positive
                style={{
                  marginLeft: "10px"
                }}
              ></status-indicator>
            </ListItem>
            <div
              className={classes.root}
              style={{
                display: "flex"
              }}
            >
              <Button variant="outlined">See All Members</Button>
              <Button variant="outlined">Add Student</Button>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Div2>
  );
}
