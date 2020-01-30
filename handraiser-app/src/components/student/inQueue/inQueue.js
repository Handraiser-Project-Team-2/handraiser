import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import naruto from "../../images/naruto.jpg";

const Div = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));
const Button = styled.button`
  border: transparent;
  background: transparent;
  cursor: pointer;
`;

export default function InQueue() {
  const classes = useStyles();

  return (
    <Div>
      <div
        style={{ backgroundColor: "#7F25D9", width: "9px", height: "72px" }}
      ></div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={naruto} />
        </ListItemAvatar>
        <ListItemText
          primary="Uzumaki Naruto"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                To:
              </Typography>
              {" Bryan Alfuente [Mentor] 10:58 AM JAN 02 2019"}
            </React.Fragment>
          }
        />
        <Button>
          <MoreVertIcon
            style={{
              paddingTop: 15,
              color: "#c4c4c4"
            }}
          />
        </Button>
      </ListItem>
    </Div>
  );
}
