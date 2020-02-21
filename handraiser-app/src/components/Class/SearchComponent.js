import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
  display: "flex",
  search: {
    "@media (height: 894px)": {
      marginLeft: "30px"
    }
  }
}));

export default function SearchComponent({ setTempClassData, classData }) {
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();

  const handleChange = e => {
    setSearchValue(e.target.value);

    const filteredClasses = classData.filter(
      el =>
        el.class_title.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
        -1
    );
    setTempClassData(filteredClasses);
  };

  return (
    <TextField
      className={classes.search}
      id="standard-basic"
      label="Search Class"
      defaultValue={searchValue}
      onChange={e => handleChange(e)}
    />
  );
}
