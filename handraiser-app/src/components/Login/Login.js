import React from "react";
import styled from "styled-components";
import backgroundImg from "../images/girl.svg";
import Logo from "../images/google.png";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";

const Div = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100vh;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 142% 150%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 140% 132%;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 142% 158%;
  }
`;
const Main = styled.div`
  width: 33.34%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    margin-top: -300px;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: -650px;
    width: 100%;
  }
`;
const Pic = styled.div`
  display: flex;
  width: 67.7%;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #7f25d9;
  background-image: url(${backgroundImg});
  background-size: 120% 100%;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
`;
const Button = styled.button`
  margin-top: 40px;
  width: 369px;
  height: 75px;
  left: 985px;
  top: 475px;
  background: linear-gradient(250.94deg, #330066 3.3%, #7f25d9 100.52%);
  border-radius: 100px;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 65%;
    height: 45px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 35%;
    height: 60px;
  }
`;
const Cont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default function Login() {
  const responseGoogle = response => {
    if (response.googleId) {
      console.log(response);

      axios({
        method: "post",
        url: "http://localhost:5000/api/login",
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
        })
        .catch(err => {
          console.log(err);
        });

      // alert("Successfully Login" + " " + response.profileObj.name);
      // localStorage.setItem("token", response.tokenId);
    } else {
      alert("Error email");
    }
  };
  return (
    <Div>
      <Pic>
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
        </p>
        <span
          style={{
            color: "white",
            fontSize: 15,
            marginLeft: 700,
            marginBottom: 800
          }}
        >
          - Jordan B. Peterson
        </span>
      </Pic>
      <Main>
        <h1
          style={{
            fontFamily: "Roboto",
            color: "#330066",
            fontSize: 40
          }}
        >
          HANDRAISER
        </h1>
        <p
          style={{
            color: "#BDBDBD",
            fontSize: 15
          }}
        >
          Login to continue
        </p>
        {/* <Button>
          <Cont>
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
            <p
              style={{
                fontFamily: "Roboto",
                color: "white",
                fontSize: "15px"
              }}
            >
              LOGIN WITH GOOGLE
            </p>
          </Cont>
       /></Button> */}
        <GoogleLogin
          clientId="239954847882-ilomcrsuv3b0oke6tsbl7ofajjb11nkl.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          hostedDomain="boom.camp"
        />
        <Footer>
          <p
            style={{
              color: "#BDBDBD",
              fontSize: 15,
              fontFamily: "Oxygen"
            }}
          >
            BOOM CAMP / BATCH 2 / TEAM 2 / 2020
          </p>
        </Footer>
      </Main>
    </Div>
  );
}
