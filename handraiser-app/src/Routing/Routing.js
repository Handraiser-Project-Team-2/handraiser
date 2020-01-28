import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";

function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;