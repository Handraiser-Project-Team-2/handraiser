import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  state: ""
});

const QueueContextProvider = props => {
  const [qData, setQdata] = useState();

  const fetchQueueData = data => {
    return qData;
  };

  const setQueueData = data => {
    setQdata(data);
    console.log(qdata)
  };

  return (
    <QueueContext.Provider
      value={{
        QData: qData,
        getQData: () => fetchQueueData(),
        setQueueData: () => setQueueData()
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
};

export default QueueContextProvider;
