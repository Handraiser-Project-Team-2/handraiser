import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, ListItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles(theme => ({
  gridCont: {
    marginTop: theme.spacing(1),
    borderRadius: "10px"
  },
  statsCont: {
    marginTop: theme.spacing(12)
  },
  profileCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: "20px"
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: theme.spacing(3),
    border: "8px solid #372476"
  },
  root: {
    flexGrow: 1
  },
  list: {
    overflow: "auto",
    maxHeight: "250px"
  }
}));

export default function MentorProfile({ classData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        style={{
          fontWeight: "bold",
          textAlign: "center",
          paddingBottom: "10px",
          fontSize: "20px"
        }}
      >
        <GroupIcon style={{ margin: "0px 5px -5px 0px" }} />
        Students
      </Typography>
      <Divider />
      <div className={classes.list}>
        {classData.map((member, index) => {
          return (
            <ListItem key={index}>
              <Avatar src={member.image} />
              <span
                style={{
                  marginLeft: "10px"
                }}
              >
                {member.first_name + " " + member.last_name}
              </span>
            </ListItem>
          );
        })}
      </div>
      <Divider />
    </div>
  );
}
