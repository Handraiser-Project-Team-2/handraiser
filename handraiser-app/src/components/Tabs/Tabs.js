import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { TableCont } from "../Table/Table";

export const TabBtn = props => {
  const [value, setValue] = useState(0);
  const [hide, setHide] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between"
        }}
      >
        <Paper
          style={{
            maxWidth: 600,
            float: "right"
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs example"
          >
            <Tab
              label="Students"
              onClick={() => setHide(hide === false ? hide : !hide)}
            />
            <Tab
              label="Mentors"
              onClick={() => setHide(hide === true ? hide : !hide)}
            />
            <Tab
              label="Admins"
              onClick={() => setHide(hide === true ? hide : !hide)}
            />
          </Tabs>
        </Paper>
        {hide && (
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "20%"
            }}
          >
            Generate Key
          </Button>
        )}
      </div>
      <div style={{ paddingTop: "90px" }}>
        <TableCont />
      </div>
    </React.Fragment>
  );
};
