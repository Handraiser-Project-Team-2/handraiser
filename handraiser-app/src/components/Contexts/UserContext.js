import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [userData, setData] = useState();

  useEffect(() => {
    fetchUserData();
  }, [sessionStorage.getItem("token")]);

  const fetchUserData = () => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: { token: sessionStorage.getItem("token") }
    })
      .then(data => {
        console.log(data)
        setData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider value={{ userData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
