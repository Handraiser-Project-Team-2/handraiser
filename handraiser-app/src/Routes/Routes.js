import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Login from "../components/Login/Login"
export default function Routes(){
    return(
        <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route path="superadmin"/>
        <Route path="admin" />
        </BrowserRouter>
    )
    }