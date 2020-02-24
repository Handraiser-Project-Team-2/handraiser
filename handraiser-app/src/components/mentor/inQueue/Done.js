import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import axios from "axios";
import QueueStub from "../../reusables/Queue/QueueStub";
import { Paper } from "@material-ui/core";

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
  }
}));

export default function InQueue({ class_id, search, rowDatahandler}) {
  const classes = useStyles();
  const [concernsData, setConcernsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `/api/classes/done/${class_id}?search=${search}`
    })
      .then(res => {
        // console
        setConcernsData(res.data);
      })
      .catch(err => console.log(err));
  }, [search]);

  return (
    <Paper style={{ maxHeight: "820px", overflow: "auto" }}>
      <List className={classes.root}>
        {concernsData
          ? concernsData.map((data, index) => {
              return (
                <QueueStub
                  rowDatahandler={{
                    class_id,rowDatahandler
                  }}
                  data={data}
                  index={index}
                  key={index}
                />
              );
            })
          : ""}
      </List>
    </Paper>
  );
}
