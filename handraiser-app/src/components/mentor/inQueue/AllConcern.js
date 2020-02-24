import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import axios from "axios";
import "status-indicator/styles.css";
import io from "socket.io-client";
import { UserContext } from "../../Contexts/UserContext";
import QueueStub from "../../reusables/Queue/QueueStub";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  done: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "10px",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "1px solid lightgrey",
    borderTop: "10px solid #372476"
  },
  queue: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "10px",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "1px solid lightgrey",
    borderTop: "10px solid #372476"
  }
}));

export default function InQueue({ class_id, search }) {
  // const { socket } = useContext(UserContext);
  const classes = useStyles();
  const [concernsData, setConcernsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { cstate, getData, socket } = useContext(UserContext);

  // const ENDPOINT = 172.60.60.42:5000;
  // let socket = io(ENDPOINT);

  useEffect(() => {
    // socket = io(ENDPOINT);

    if (!cstate) {
      getData();
    }

    if (cstate) {
      socket.emit("join", {
        username: cstate.user_id,
        room: class_id,
        image: ""
      });
    }

    update("");
  }, []);

  useEffect(() => {
    update(search);

    socket.on("updateComponents", message => {
      update("");
    });
  }, [search]);

  const update = data => {
    axios({
      method: "get",
      url: `/api/classes/all/${class_id}?search=${data}`
    })
      .then(res => {
        setConcernsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Paper
      style={{
        height: "820px",
        overflow: "auto"
      }}
    >
      <List className={classes.root}>
        {concernsData
          ? concernsData.map((data, index) => {
              return (
                <QueueStub
                  rowDatahandler={{
                    class_id
                  }}
                  data={data}
                  index={index}
                />
              );
            })
          : ""}
      </List>
    </Paper>
  );
}
