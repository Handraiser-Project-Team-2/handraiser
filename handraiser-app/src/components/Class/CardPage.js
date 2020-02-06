import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  actions: {
    backgroundColor: blueGrey[100]
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
    top: theme.spacing(6),
    left: theme.spacing(2)
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
    minHeight: 80
  },
  card: {
    minWidth: 345,
    maxWidth: 345,
    float: "left",
    margin: theme.spacing(2),
    boxShadow: "10px 10px 8px #888888"
  },
  media: {
    height: 140
  }
}));


export default function CardPage({ classData, data }) {
  const classes = useStyles();
  let history = useHistory();

  const cardClick = (e) => {
    history.push(`/student/${e}`);
  }

  return (
    <>
      {classData.map(row => (
        <Card className={classes.card} key={row.class_id} onClick={()=>{cardClick(row.class_id)}}>
          <CardActionArea>
            <CardContent className={classes.title}>
              <Typography gutterBottom variant="h5" component="h2">
                {row.class_title}
              </Typography>
              <Avatar
                variant="square"
                className={classes.square}
                alt="Remy Sharp"
                src={data.image}
              />
            </CardContent>

            <CardContent className={classes.description}>
              <Typography
                variant="body1"
                component="p"
                style={{ color: "white" }}
              >
                {row.class_description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actions}>
            <Typography variant="caption" display="block" gutterBottom>
               Class code: {row.classroom_key}
            </Typography>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
