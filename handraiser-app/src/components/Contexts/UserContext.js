import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const ENDPOINT = "localhost:5000";
const socket = io(ENDPOINT);

export const UserContext = createContext({
  state: "",
  socket: ""
});

const UserContextProvider = props => {
  const [userData, setData] = useState();

  const getSocket = () => {
    return socket;
  };

  const fetchUserData = () => {

    console.log(sessionStorage.getItem("token"))
    
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
        setData: () => flushData(),
        socket,
        resocket: () => getSocket()
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
