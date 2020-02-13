import React, { useEffect, useState } from "react";
import axios from "axios";
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
import InfoIcon from "@material-ui/icons/Info";
import GroupIcon from "@material-ui/icons/Group";
import James from "../../images/1966.png";
import DescriptionIcon from "@material-ui/icons/Description";
import { Avatar, ListItemText, ListItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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

export default function SimpleExpansionPanel({
  class_id,
  expanded,
  setExpanded
}) {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState("panel1");
  const [classInfo, setClassInfo] = useState([]);
  const [classMem, setClassMem] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    axios({
      method: "post",
      url: `http://localhost:5000/api/classinfo/${class_id}?search=${search}`
    })
      .then(res => {
        // console.log(res.data);
        setClassInfo(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [search]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/classes/members/${class_id}?search=${search}`
    })
      .then(res => {
        setClassMem(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [search]);

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
          <InfoIcon
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
              <span>{classInfo.class_title}</span>
            </span>
            <span style={{ padding: "25px 10px 5px 10px", color: "grey" }}>
              Description
            </span>
            <span
              style={{
                padding: "10px 10px 8px 9px",
                color: "darkblue"
              }}
            >
              {classInfo.class_description}
            </span>
            <span style={{ padding: "25px 10px 5px 10px", color: "grey" }}>
              Date Created
            </span>
            <span style={{ padding: "10px 10px 8px 9px" }}>
              {classInfo.class_date_created}
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
          <GroupIcon
            style={{
              marginRight: "15px",
              color: "forestgreen"
            }}
          />
          <Typography>Members </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            {classMem.map((member, index) => {
              return (
                <ListItem key={index}>
                  <Avatar
                    src={member.image}
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
                    {member.first_name + " " + member.last_name}
                  </span>
                  {member.user_status === 1 ? (
                    <status-indicator
                      positive
                      style={{
                        marginLeft: "10px"
                      }}
                    ></status-indicator>
                  ) : (
                    <status-indicator
                      style={{
                        marginLeft: "10px"
                      }}
                    ></status-indicator>
                  )}
                </ListItem>
              );
            })}
            <ListItem>
              <Avatar
                src={classInfo.image}
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
                {classInfo.first_name + " " + classInfo.last_name + " (Mentor)"}
              </span>
              {classInfo.user_status === 1 ? (
                <status-indicator
                  positive
                  style={{
                    marginLeft: "10px"
                  }}
                ></status-indicator>
              ) : (
                <status-indicator
                  style={{
                    marginLeft: "10px"
                  }}
                ></status-indicator>
              )}
            </ListItem>
            <div
              className={classes.root}
              style={{
                display: "flex"
              }}
            >
              {/* <Button variant="outlined">See All Members</Button>
              <Button variant="outlined">Add Student</Button> */}
              <TextField
                id="outlined-basic"
                placeholder="Search member..."
                fullWidth
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Div2>
  );
}
