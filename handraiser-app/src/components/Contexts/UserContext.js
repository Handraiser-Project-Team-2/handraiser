import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  state: ""
});

const UserContextProvider = props => {
  const [userData, setData] = useState();

  const fetchUserData = () => {
    axios({
      method: "post",
      url: `/api/user/data`,
      data: { token: sessionStorage.getItem("token") }
    })
      .then(data => {
        // console.log(data);
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
