import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { TabBtn } from "../Tabs/Tabs";
import Topbar from "../reusables/Topbar";

export default function NavBar() {
  let history = useHistory();
  const [state, setState] = useState({ user_type: "" });

  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     axios
  //       .post("/api/user/data", {
  //         token: sessionStorage.getItem("token").split(" ")[1]
  //       })
  //       .then(data => {
  //         setState({ user_type: data.data.user_type_id });
  //         const user_type = data.data.user_type_id;
  //         if (user_type !== 1) {
  //           Swal.fire({
  //             icon: "error",
  //             title: "You cannot acces this page!"
  //           }).then(function() {
  //             if (user_type === 3) {
  //               history.push("/student");
  //             } else if (user_type === 4) {
  //               history.push("/mentor");
  //             }
  //           });
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "You cannot acces this page!"
  //     }).then(function() {
  //       history.push("/");
  //     });
  //   }
  // }, []);

  // if (state.user_type === 1) {
  return (
    <React.Fragment>
      <Topbar />
      <div style={{ paddingTop: "100px", marginRight: "5%", marginLeft: "5%" }}>
        <TabBtn />
      </div>
    </React.Fragment>
  );
  //   } else {
  //     return "";
  //   }
}
