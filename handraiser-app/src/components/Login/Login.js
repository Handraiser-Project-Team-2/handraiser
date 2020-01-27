import React from "react";
import styled from "styled-components";
import Background from "../images/undraw_programmer_imem 1 (1).svg";
import Logo from "../images/google.png";

const Div = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100vh;
`;
const Main = styled.div`
  width: 33.34%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const Pic = styled.div`
  display: flex;
  width: 67.7%;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #7f25d9;
`;
const Button = styled.button`
  margin-top: 40px;
  width: 369px;
  height: 75px;
  left: 985px;
  top: 475px;
  background: linear-gradient(250.94deg, #330066 3.3%, #7f25d9 100.52%);
  border-radius: 100px;
  cursor: pointer;
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
`;

export default function Login() {
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
            fontSize: 10,
            marginLeft: 730
          }}
        >
          - Jordan B. Peterson
        </span>

        <img src={Background} alt="" />
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
        <Button>
          <Cont>
            <img
              src={Logo}
              alt=""
              style={{
                paddingTop: 5,
                width: "60px",
                height: "40px",
                borderRadius: "100px"
              }}
            />
            <p
              style={{
                fontFamily: "Roboto",
                color: "white",
                fontSize: 15
              }}
            >
              LOGIN WITH GOOGLE
            </p>
          </Cont>
        </Button>
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
