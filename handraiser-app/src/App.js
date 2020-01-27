import React from "react";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";

export default function App() {
  const responseGoogle = response => {
    console.log(response);
  };

  return (
    <div>
      <Button variant="contained" color="primary">
        Welcome to Handraiser Project
      </Button>
      <GoogleLogin
        clientId="626321616258-iu098e6avcv1n8kuhe53lhtcueejes2k.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
