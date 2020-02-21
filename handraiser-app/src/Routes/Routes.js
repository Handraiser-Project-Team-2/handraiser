import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Student from "../components/student/StudentUi";
import Mentor from "../components/mentor/MentorUi";
import SuperAdmin from "../components/Super-Admin/Super-Admin";
import Class from "../components/Class/ClassLanding";
import Chat from "../components/reusables/Chat"
export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/superadmin" component={SuperAdmin} />
      <Route path="/admin" />
      <Route path="/student/:class_id" component={Student} />
      <Route path="/class" component={Class} />
      <Route path="/classroom/:class_id" component={Chat} />
      <Route path="/mentor/:class_id" component={Mentor} />
    </BrowserRouter>
  );
}
