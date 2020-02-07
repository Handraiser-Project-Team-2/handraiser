import React from "react";
import Routes from "./Routes/Routes";
import UserContextProvider from "./components/Contexts/UserContext";
import "./App.css";

function App() {
  return (
    <div className="app">
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </div>
  );
}

export default App;
