import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Student from "../components/student/StudentUi";
import SuperAdmin from "../components/Super-Admin/Super-Admin";
import Class from '../components/Class/ClassLanding'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/superadmin" component={SuperAdmin} />
      <Route path="/admin" />
      <Route path="/student" component={Student} />
      <Route path="/class" component={Class} />
      <Route path="/mentor" />
    </BrowserRouter>
  );
}
