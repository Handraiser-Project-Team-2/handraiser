import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function SearchComponent({ setTempClassData, classData }) {
  const [searchValue, setSearchValue] = useState("");

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
      id="standard-basic"
      label="Search Class"
      style={{ float: "left" }}
      defaultValue={searchValue}
      onChange={e => handleChange(e)}
    />
  );
}
