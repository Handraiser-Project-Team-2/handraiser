import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import QueQueStub from "../../reusables/Queue/QueueStub";
import axios from "axios";
import io from "socket.io-client";
import { UserContext } from "../../Contexts/UserContext";

let room2 = "";
let prevdata = [];
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
  const [concernCheck, setConcernCheck] = useState();
  // const [room, setRoom] = useState();

  useEffect(() => {
    // socket = io(ENDPOINT);

    socket.emit("join", {
      userid: "null",
      username: "Admin",
      room: rowDatahandler.class_id
    });

    socket.on("updateComponents", message => {
      update("");
    });

    socket.on("consolidateRequest", message => {
      update("");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected to server");
    });
  }, []);

  useEffect(() => {
    update(rowDatahandler.search);
  }, [rowDatahandler.search]);

  // useEffect(() => {

  // }, [rowDatahandler.rowDatahandler.search, concernsData]);

  // check if the current room was removed from the queue list

  const check_if_removed = (data, room) => {
    if (!prevdata) {
      prevdata = data;
    } else {

      prevdata = data;

      if (prevdata.indexOf(room) < 0) {
        rowDatahandler.closeFlag();
      }

      console.log(prevdata.indexOf(room), prevdata, room)

    }
  };

  const update = data => {
    if (rowDatahandler.class_id) {
      axios({
        method: "get",
        url: `/api/classes/queue/${rowDatahandler.class_id}?search=${data}`
      })
        .then(res => {
          setConcernsData(res.data);
          return res;
        })
        .then(res => {
          let presentId = [];

          res.data.map((data, index) => {
            presentId.push(data.concern_id);
          });

          check_if_removed(presentId, room2);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
                  setSelection={rowDatahandler.setSelection}
                  rowDatahandler={rowDatahandler}
                  data={data}
                  index={index}
                  closeFlag={rowDatahandler.closeFlag}
                  setRoom={data => {
                    room2 = data;
                  }}
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
