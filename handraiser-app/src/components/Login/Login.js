import React from "react";
import Logo from "../images/google.png";
import { GoogleLogin, GoogleLogout } from "react-google-login";
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
} from "../Styles/Styles";

export default function Login(props) {
  const responseGoogle = response => {
    if (response.googleId) {
      // console.log(response);

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
          console.log(data);

          const userType = data.data.user_type_id;

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
              props.history.push("/student");
              break;
            case 4:
              // mentor
              props.history.push("/mentor");
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
  return (
    <LoginDiv>
      <LoginPic>
        <p
          style={{
            fontFamily: "Oxygen",
            color: "white",
            fontSize: "30px",
            alignSelf: "center"
          }}
        >
          The first step of learning
          <br /> is admitting our insufficiency
          <br />{" "}
          <span
            style={{
              display: "flex",
              color: "white",
              fontSize: 15,
              justifyContent: "flex-end"
            }}
          >
            - Jordan B. Peterson
          </span>
        </p>
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
                    paddingTop: 10,
                    width: "40px",
                    height: "30px",
                    borderRadius: "100px"
                  }}
                />
                <Continue>LOGIN WITH GOOGLE</Continue>
              </LoginCont>
            </LoginButton>
          )}
        />

        <LoginFooter>
          <p
            style={{
              color: "#BDBDBD",
              fontSize: 15,
              fontFamily: "Oxygen"
            }}
          >
            BOOM CAMP / BATCH 2 / TEAM 2 / 2020
          </p>
        </LoginFooter>
      </LoginMain>
    </LoginDiv>
  );
}
