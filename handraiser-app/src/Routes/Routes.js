import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import SuperAdmin from "../components/Super-Admin/Super-Admin";
export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/superadmin" component={SuperAdmin} />
      <Route path="/admin" />
      <Route path="/student" />
      <Route path="/mentor" />
    </BrowserRouter>
  );
}
