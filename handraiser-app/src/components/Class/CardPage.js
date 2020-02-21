import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Background from "../images/classroom-background-clipart-11.jpg";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Collapse from "@material-ui/core/Collapse";
import EditClassDialog from "./EditClassDialog";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CardPage({ classData, data, fetchMentorClass }) {
  const classes = useStyles();
  let history = useHistory();

  const { cstate, getData } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const loading = () => {
    handleToggle();
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  useEffect(() => {
    if (!cstate) {
      getData();
    }
  }, [cstate, getData]);

  const cardClick = e => {
    loading();
    setTimeout(() => {
      history.push(`/classroom`);
      if (cstate) {
        history.push(`/classroom/${e}`);
      }
    }, 1000);

    // if (cstate) {
    //   if (cstate.user_type_id === 3) {
    //     history.push(`/student/${e}`);
    //   }
    //   if (cstate.user_type_id === 4) {
    //     history.push(`/mentor/${e}`);
    //   }
    // }
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
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Collapse in={copied}>
        ;<Alert severity="success">Copied to clipboard!</Alert>
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
              ></Typography>
            </CardContent>
            <CardContent className={classes.description}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.title2}
              >
                {row.class_title}
              </Typography>
              <Typography className={classes.typoDescription}>
                {row.class_description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actions}>
            {row.class_status === "open" ? (
              <div className={classes.availability_open}>OPEN</div>
            ) : (
              <div className={classes.availability_close}>CLOSE</div>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={classes.mentorName}
              >
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

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  typoDescription: {
    color: "grey",
    overflow: " hidden",
    "text-overflow": "ellipsis"
  },
  typoTitle: {
    height: theme.spacing(8)
  },
  copyIcon: {
    color: "white",
    "&:hover": {
      color: "#ffffAA"
    }
  },
  actions: {
    backgroundColor: "#372476",
    borderTop: "1px solid lightgrey",
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  description: {
    borderTop: "1px solid #372476",
    marginTop: "-20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "whitesmoke",
    minHeight: 150,
    maxHeight: 350
  },
  title: {
    background: `url(${Background})`,
    backgroundSize: "100% 100%",
    height: 150
  },
  title2: {
    fontWeight: "bold",
    color: "black",
    borderBottom: "1px solid #372476"
  },
  mentorName: {
    marginLeft: "3px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "inherit"
  },
  card: {
    minWidth: 345,
    maxWidth: 345,
    float: "left",
    margin: theme.spacing(2),
    boxShadow: "10px 10px 8px #888888",
    overflowWrap: "break-word",
    borderRadius: 10,
    border: "1px solid #372476"
  },
  media: {
    height: 140
  },
  availability_open: {
    fontSize: "0.7em",
    padding: "5px",
    marginLeft: "10px",
    color: "white",
    background: "rebeccapurple"
  },
  availability_close: {
    fontSize: "0.7em",
    padding: "5px",
    marginLeft: "10px",
    color: "#ffffff69",
    background: "#880E4F"
  }
}));
