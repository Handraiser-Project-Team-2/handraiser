import React from "react";
import { Conversation } from "../Styles/Styles";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

const Cont = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 15px;
  padding: 10px;
  flex-direction: row-reverse;
`;
const Cont2 = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 15px;
  padding: 10px;
  flex-direction: row;
`;
const Profile = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: flex-end;
`;
const Sender = styled.div`
  margin-left: 10px;
  background-color: forestgreen;
  color: white;
  max-width: 450px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px 10px 0px 10px;
`;
const Receiver = styled.div`
  margin-left: 10px;
  background-color: #f2f2f2;
  max-width: 450px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px 10px 10px 0px;
`;

const Div = styled.div`
  span {
    display: inline-block;
    background-color: white;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    margin-right: 5px;
    animation: bob 2s infinite;
  }
  span:nth-child(1) {
    animation-delay: -1s;
  }
  span:nth-child(2) {
    animation-delay: -0.85s;
  }
  span:nth-child(3) {
    animation-delay: -0.7s;
    margin-right: 0;
  }
  @keyframes bob {
    10% {
      transform: translateY(-10px);
      background-color: white;
    }
    50% {
      transform: translateY(0);
      background-color: white;
    }
  }
`;

export default function Chatfield(props) {
  const { userImage } = props;
  return (
    <Conversation>
      <Cont>
        <Profile>
          <Avatar src={userImage}></Avatar>
        </Profile>
        <Sender>
          <Div>
            <span></span>
            <span></span>
            <span></span>
          </Div>
        </Sender>
      </Cont>
      <Cont2>
        <Profile>
          <Avatar></Avatar>
        </Profile>
        <Receiver>
          <span>
            Curry to Igoudala! Back to Curry! Igoudala with the layup...
            OHHHH!!!! BLOCKED BY JAMES!!!
          </span>
        </Receiver>
      </Cont2>
    </Conversation>
  );
}
