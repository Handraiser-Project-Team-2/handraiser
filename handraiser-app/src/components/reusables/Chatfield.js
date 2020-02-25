import React from "react";
import { Conversation } from "../Styles/Styles";
import styled from "styled-components";
import ReactEmoji from "react-emoji";
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

const Sender = styled.div`
  margin-left: 10px;
  color: white;
  padding: 10px 20px 10px 20px;
`;
const Receiver = styled.div`
  margin-left: 10px;
  padding: 10px 20px 10px 20px;
  p {
    max-width: 255px;
    word-wrap: break-word;
    margin-bottom: 12px;
    line-height: 24px;
    position: relative;
    padding: 10px 20px;
    border-radius: 25px;
  }

  p:before,
  p:after {
    content: "";
    position: absolute;
    bottom: -2px;
    height: 20px;
  }
  .from-them {
    background: #e5e5ea;
    color: black;
  }
  .from-them:before {
    left: -7px;
    border-left: 20px solid #e5e5ea;
    border-bottom-right-radius: 16px 14px;
    -webkit-transform: translate(0, -2px);
    transform: translate(0, -2px);
  }
  .from-them:after {
    left: 4px;
    width: 26px;
    background: white;
    border-bottom-right-radius: 10px;
    -webkit-transform: translate(-30px, -2px);
    transform: translate(-30px, -2px);
  }
`;

const Div = styled.div`
  p {
    max-width: 255px;
    word-wrap: break-word;
    margin-bottom: 12px;
    line-height: 24px;
    position: relative;
    padding: 10px 20px;
    border-radius: 25px;
  }

  p:before,
  p:after {
    content: "";
    position: absolute;
    bottom: -2px;
    height: 20px;
  }

  .from-me {
    color: white;
    background: #0b93f6;
    align-self: flex-end;
  }

  .from-me:before {
    right: -7px;
    border-right: 20px solid #0b93f6;
    border-bottom-left-radius: 16px 14px;
    -webkit-transform: translate(0, -2px);
    transform: translate(0, -2px);
  }

  .from-me:after {
    right: -56px;
    width: 26px;
    background: white;
    border-bottom-left-radius: 10px;
    -webkit-transform: translate(-30px, -2px);
    transform: translate(-30px, -2px);
  }
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

const Chatfield = ({ message: { message, user_id }, userid, date, time }) => {
  let isSentByCurrecntUser = false;

  if (user_id === userid) {
    isSentByCurrecntUser = true;
  }
  return isSentByCurrecntUser ? (
    // <Conversation>
    <div>
      <h6
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: "10px",
          color: "grey",
          fontSize: "10px"
        }}
      >
        {date}
      </h6>
      <Cont>
        <Sender>
          <Div>
            {/* <p className="from-me">{ReactEmoji.emojify(message)}</p> */}
            {message.includes("https") ? (
              <img src={message} height="250" width="200" />
            ) : (
              <p className="from-me">{ReactEmoji.emojify(message)}</p>
            )}
          </Div>
          <h6
            style={{
              float: "right",
              color: "lightgrey",
              fontSize: "10px"
            }}
          >
            {time}
          </h6>
        </Sender>
      </Cont>
    </div>
  ) : (
    <>
      <h6
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: "10px",
          color: "grey",
          fontSize: "10px"
        }}
      >
        {date}
      </h6>
      <Cont2>
        <Receiver>
          {/* <p className="from-them">{ReactEmoji.emojify(message)}</p> */}
          {message.includes("https") ? (
            <a target="_blank" href={message}>
              <im/g src={message} height="250" width="250" />
            </a>
          ) : (
            <p className="from-them">{ReactEmoji.emojify(message)}</p>
          )}
          <h6
            style={{
              marginLeft: "35px",
              color: "lightgrey",
              fontSize: "10px"
            }}
          >
            {time}
          </h6>
        </Receiver>
      </Cont2>
    </>
    // <Cont>
    //   <Sender>
    //     <Div>
    //       <p className="from-me">
    //         <span></span>
    //         <span></span>
    //         <span></span>
    //       </p>
    //     </Div>
    //   </Sender>
    // </Cont>
    // </Conversation>
  );
};

export default Chatfield;
