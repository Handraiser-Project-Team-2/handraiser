import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
  state: ""
});

const UserContextProvider = props => {
  const [userData, setData] = useState();

  // useEffect(() => {
  //   if (sessionStorage.getItem("token") || userData) {
  //     // setTimeout(() => {
  //     fetchUserData();
  //     // }, 1000);
  //   }
  // }, [sessionStorage.getItem("token")]);

  const fetchUserData = () => {
    axios({
      method: "post",
      url: `http://localhost:5000/api/user/data`,
      data: { token: sessionStorage.getItem("token") }
    })
      .then(data => {
        console.log(data);
        setData(data.data);
      })
      .catch(err => {
        console.log(err);
        if (window.location.href.includes("/class")) {
          fetchUserData();
        }
      });
  };

  const flushData = () => {
    setData();
  };

  return (
    <UserContext.Provider
      value={{
        cstate: userData,
        getData: () => fetchUserData(),
        setData: () => flushData()
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
