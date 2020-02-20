import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { Shared, Div2 } from "../../../Styles/Styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Avatar, ListItem } from "@material-ui/core";
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
  },
  title: {
    display: "inline-block",
    overflow: " hidden",
    width: "250px",
    "text-overflow": "ellipsis",
    "white-space": " nowrap"
  },
  desc: {
    padding: "10px 10px 8px 9px",
    color: "darkblue",
    width: "250px",
    display: "inline-block",
    overflow: " hidden",
    "text-overflow": "ellipsis",
    "white-space": " nowrap"
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
  const [classInfo, setClassInfo] = useState([]);
  const [classMem, setClassMem] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [tempClassInfo, setTempClassInfo] = useState([]);

  useEffect(() => {
    getClassMember();
    getclassInfo();
  }, []);

  const getClassMember = () => {
    axios({
      method: "get",
      url: `/api/classes/members/${class_id}`
    })
      .then(res => {
        setClassMem(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getclassInfo = () => {
    axios({
      method: "post",
      url: `/api/classinfo/${class_id}`
    })
      .then(res => {
        setClassInfo(res.data);
        setTempClassInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [tempClassMem, setTempClassMem] = useState([]);
  const classMembers = classMem.concat(classInfo);
  const handleSearch = e => {
    setSearch(e.target.value);
    const filteredMembers = classMembers.filter(
      el =>
        el.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        el.last_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setTempClassMem(filteredMembers);
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
          {classInfo
            ? classInfo.map((info, key) => {
                return (
                  <div
                    key={key}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span
                      style={{ padding: "5px 10px 5px 10px", color: "grey" }}
                    >
                      Name
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 10px 5px 10px"
                      }}
                    >
                      <span className={classes.title}>{info.class_title}</span>
                    </span>
                    <span
                      style={{ padding: "25px 10px 5px 10px", color: "grey" }}
                    >
                      Description
                    </span>
                    <span className={classes.desc}>
                      {info.class_description}
                    </span>
                    <span
                      style={{ padding: "25px 10px 5px 10px", color: "grey" }}
                    >
                      Date Created
                    </span>
                    <span style={{ padding: "10px 10px 8px 9px" }}>
                      {new Date(info.class_date_created).toLocaleString()}
                    </span>
                  </div>
                );
              })
            : ""}
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
          <Typography>Members </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            {tempClassMem.length === 0
              ? classMembers.map((member, index) => {
                  return (
                    <ListItem key={index}>
                      <Avatar
                        src={member.image}
                        style={{
                          marginLeft: "-17px"
                        }}
                      ></Avatar>

                      {member.user_type_id === 4 ? (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontWeight: "bold"
                          }}
                        >
                          {member.first_name +
                            " " +
                            member.last_name +
                            " (Mentor)"}
                        </span>
                      ) : (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontWeight: "bold"
                          }}
                        >
                          {member.first_name + " " + member.last_name}
                        </span>
                      )}

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
                })
              : tempClassMem.map((member, index) => {
                  return (
                    <ListItem key={index}>
                      <Avatar
                        src={member.image}
                        style={{
                          marginLeft: "-17px"
                        }}
                      ></Avatar>

                      {member.user_type_id === 4 ? (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontWeight: "bold"
                          }}
                        >
                          {member.first_name +
                            " " +
                            member.last_name +
                            " (Mentor)"}
                        </span>
                      ) : (
                        <span
                          style={{
                            marginLeft: "8px",
                            fontWeight: "bold"
                          }}
                        >
                          {member.first_name + " " + member.last_name}
                        </span>
                      )}

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

            <div
              className={classes.root}
              style={{
                display: "flex"
              }}
            >
              <TextField
                id="outlined-basic2"
                placeholder="Search member..."
                fullWidth
                onChange={e => handleSearch(e)}
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Div2>
  );
}
