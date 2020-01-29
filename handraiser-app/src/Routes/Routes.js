import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Student from "../components/student/StudentUi";
export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Student} />
      <Route path="/superadmin" />
      <Route path="/admin" />
      <Route path="/student" />
      <Route path="/menor" />
    </BrowserRouter>
  );
}
