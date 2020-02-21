import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import QueQueStub from "../../reusables/Queue/QueueStub";
import axios from "axios";
import io from "socket.io-client";
import { UserContext } from "../../Contexts/UserContext";
// let socket;
export default function InQueue(rowDatahandler) {
  const { socket } = useContext(UserContext);
  const classes = useStyles();
  const [concernsData, setConcernsData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();
  const open = Boolean(anchorEl);
  const ENDPOINT = "172.60.62.113:5000";
  // let socket = io(ENDPOINT);

  useEffect(() => {
    // socket = io(ENDPOINT);

    socket.emit("join", {
      userid: "null",
      username: "Admin",
      room: rowDatahandler.class_id
    });
    console.log("inqueue student", socket);
  }, []);

  useEffect(() => {
    update(rowDatahandler.search);
  }, [rowDatahandler.search]);

  useEffect(() => {
    socket.on("updateComponents", message => {
      update("");
    });

    socket.on("consolidateRequest", message => {
      update("");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected to server");
    });
  }, [rowDatahandler.rowDatahandler.search, concernsData]);

  const update = data => {
    axios({
      method: "get",
      url: `/api/classes/queue/${rowDatahandler.class_id}?search=${data}`
    })
      .then(res => {
        setConcernsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Paper style={{ maxHeight: "820px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData
          ? concernsData.map((data, index) => {
              return (
                <QueQueStub
                  update={update}
                  key={index}
                  rowDatahandler={rowDatahandler}
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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));
