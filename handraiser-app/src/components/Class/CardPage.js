import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import CardActions from "@material-ui/core/CardActions";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Collapse from "@material-ui/core/Collapse";
import EditClassDialog from "./EditClassDialog";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  typoDescription: {
    marginTop: theme.spacing(2),
    color: "white"
  },
  typoTitle: {
    height: theme.spacing(8)
  },
  copyIcon: {
    color: blueGrey[500]
  },
  actions: {
    backgroundColor: blueGrey[100],
    display: "flex",
    justifyContent: "space-between"
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  description: {
    backgroundColor: blueGrey[200],
    textAlign: "center",
    minHeight: 130,
    paddingTop: theme.spacing(4)
  },
  title: {
    backgroundColor: blueGrey[500],
    color: "white",
    textAlign: "center",
    minHeight: 80,
    maxHeight: 120
  },
  card: {
    minWidth: 345,
    maxWidth: 345,
    float: "left",
    margin: theme.spacing(2),
    boxShadow: "10px 10px 8px #888888",
    overflowWrap: "break-word",
    maxHeight: 325
  },
  media: {
    height: 140
  }
}));

export default function CardPage({ classData, data, fetchMentorClass }) {
  const classes = useStyles();
  let history = useHistory();
  const { cstate, getData } = useContext(UserContext);

  useEffect(() => {
    if (!cstate) {
      getData();
    }
  }, [cstate, getData]);

  const cardClick = e => {
    if (cstate) {
      if (cstate.user_type_id === 3) {
        history.push(`/student/${e}`);
      }
      if (cstate.user_type_id === 4) {
        history.push(`/mentor/${e}`);
      }
    }
  };

  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <>
      <Collapse in={copied}>
        <Alert severity="success">Copied to clipboard!</Alert>
      </Collapse>
      {classData.map(row => (
        <Card className={classes.card} key={row.class_id}>
          <CardActionArea
            onClick={() => {
              cardClick(row.class_id);
            }}
          >
            <CardContent className={classes.title}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.typoTitle}
              >
                {row.class_title}
              </Typography>
              <Avatar
                variant="square"
                className={classes.square}
                alt="Remy Sharp"
                src={data.user_type_id === 3 ? row.image : data.image}
              />
            </CardContent>

            <CardContent className={classes.description}>
              <Typography
                variant="body1"
                component="p"
                className={classes.typoDescription}
              >
                {row.class_description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actions}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="caption" display="block" gutterBottom>
                {cstate && cstate.user_type_id === 3
                  ? `Mentor: ${row.first_name} ${row.last_name}`
                  : null}
                {cstate && cstate.user_type_id === 4
                  ? `Class code: ${row.classroom_key}`
                  : null}
              </Typography>

              {cstate && cstate.user_type_id === 4 ? (
                <CopyToClipboard onCopy={onCopy} text={row.classroom_key}>
                  <IconButton aria-label="delete" className={classes.copyIcon}>
                    <FileCopyIcon fontSize="small" />
                  </IconButton>
                </CopyToClipboard>
              ) : null}
            </div>
            {cstate && cstate.user_type_id === 4 ? (
              <EditClassDialog data={row} fetchMentorClass={fetchMentorClass} />
            ) : null}
          </CardActions>
        </Card>
      ))}
    </>
  );
}
