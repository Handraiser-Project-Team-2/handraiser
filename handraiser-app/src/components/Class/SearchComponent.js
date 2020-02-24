import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  search: {
    marginLeft: "25px",
    backgroundColor: "white",
    borderRadius: "15px"
  },
  floatingLabelFocusStyle: {
    color: "#372476"
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
      variant="filled"
      id="standard-basic"
      label="Search..."
      defaultValue={searchValue}
      onChange={e => handleChange(e)}
      InputLabelProps={{
        className: classes.floatingLabelFocusStyle
      }}
    />
  );
}
