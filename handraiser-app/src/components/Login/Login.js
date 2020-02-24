import React, { useState, useEffect, useContext } from "react";
import Logo from "../images/google.png";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import {
  LoginDiv,
  LoginPic,
  LoginMain,
  LoginButton,
  LoginCont,
  LoginFooter,
  Continue,
  Title
} from "../../Styles/Styles";
import io from "socket.io-client";
import { UserContext } from "../Contexts/UserContext";
// COMPONENT
import SetSuperAdminDialog from "./SetSuperAdminDialog";
export default function Login(props) {
  const [logged, setLogged] = useState(false);
  const { socket } = useContext(UserContext);
  
  const responseGoogle = response => {
    if (response.googleId) {
      // console.log(response);
      setLogged(true);
      axios({
        method: "post",
        url: "/api/login",
        data: {
          email: response.profileObj.email,
          last_name: response.profileObj.familyName,
          first_name: response.profileObj.givenName,
          image: response.profileObj.imageUrl,
          googleId: response.profileObj.googleId,
          middle_name: "temp"
        }
      })
        .then(data => {
          axios
            .patch(`/api/users/${data.data.user_id}`, {
              user_status: 1
            })
            .then(data => {
              console.log("updating user activity");
              socket.emit("user_activity", {});
            })
            .catch(err => {
              console.log(err);
            });
          const userType = data.data.user_type_id;
          localStorage.setItem("name", response.profileObj.givenName);
          sessionStorage.setItem("token", "Bearer " + data.data.token);

          switch (userType) {
            case 1:
              // superAdmin
              props.history.push("/superadmin");
              break;
            case 2:
              // Admin
              props.history.push("/admin");
              break;
            case 3:
              // student
              props.history.push("/class");
              break;
            case 4:
              // mentor
              props.history.push("/class");
              break;
            default:
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("Error email");
    }
  };

  const [toggleDialog, setToggleDialog] = useState(false);
  const handleKeyDown = event => {
    if (event.ctrlKey && event.keyCode == 90) {
      setToggleDialog(true);
      // console.log('he')
    }
  };
  return (
    <LoginDiv onKeyDown={e => handleKeyDown(e)} tabIndex="0">
      <SetSuperAdminDialog
        toggleDialog={toggleDialog}
        setToggleDialog={setToggleDialog}
      />
      <LoginPic>
        <LinearProgress
          color="secondary"
          style={{
            display: logged ? "block" : "none",
            position: "absolute",
            top: 0,
            width: "100%"
          }}
        />
      </LoginPic>
      <LoginMain>
        <Title>HANDRAISER</Title>
        <p
          style={{
            color: "#BDBDBD",
            fontSize: 15
          }}
        >
          Login to continue
        </p>

        <GoogleLogin
          clientId="239954847882-ilomcrsuv3b0oke6tsbl7ofajjb11nkl.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          hostedDomain="boom.camp"
          render={renderProps => (
            <LoginButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <LoginCont>
                <img
                  src={Logo}
                  alt=""
                  style={{
                    paddingTop: 8,
                    width: "40px",
                    height: "40px",
                    borderRadius: "100px"
                  }}
                />
                <Continue>LOGIN WITH GOOGLE</Continue>
              </LoginCont>
            </LoginButton>
          )}
        />

        <LoginFooter>
          <p>BOOM CAMP / BATCH 2 / TEAM 2 / 2020</p>
        </LoginFooter>
      </LoginMain>
    </LoginDiv>
  );
}
