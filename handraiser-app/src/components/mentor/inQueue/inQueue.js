import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import QueQueStub from "../../reusables/Queue/QueueStub";
import axios from "axios";
import io from "socket.io-client";
let socket;
export default function InQueue(rowDatahandler) {
  const classes = useStyles();
  const [concernsData, setConcernsData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();
  const open = Boolean(anchorEl);
  // const ENDPOINT = "localhost:5000";
  // let socket = io(ENDPOINT);

  // useEffect(() => {
  //   socket = io(ENDPOINT);

  //   socket.emit("join", {
  //     username: "Admin",
  //     room: rowDatahandler.class_id,
  //     image: ""
  //   });
  // }, [ENDPOINT]);

  useEffect(() => {
    if (rowDatahandler.search || !concernsData) {
      update(rowDatahandler.search);
    }

    // socket.on("updateComponents", message => {
    //   update("");
    // });

    // socket.on("consolidateRequest", message => {
    //   update("");
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected to server");
    // });
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
