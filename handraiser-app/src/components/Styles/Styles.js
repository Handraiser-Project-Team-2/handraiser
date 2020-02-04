import styled from "styled-components";
import backgroundImg from "../images/girl.svg";

//Table Styles
export const TabBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  @media screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    padding-top: 10px;
  }
`;

export const RowCont = styled.div`
  text-align: center;
`;

export const TableStyle = styled.div`
  @media only screen and (max-width: 500px),
    (height: 1024px) and (width: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: landscape),
    (width: 1024px) and (height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      display: none;
    }

    tr {
      border: 1px solid lightgray;
      border-radius: 10px;
    }

    td {
      border: none;
      position: relative;
      padding-left: 60px;
    }

    td:before {
      position: absolute;
      align-items: center;
      top: 6px;
      left: 6px;
      width: 20%;
      padding: 10px;
    }

    td:nth-of-type(1):before {
      content: "Email:";
    }
    td:nth-of-type(2):before {
      content: "Status:";
    }
    td:nth-of-type(3):before {
      content: "Key:";
    }
    td:nth-of-type(4):before {
      content: "Action:";
    }
  }
`;
//Student and Mentor Ui Styles
export const Nav = styled.div`
  width: 100%;
  padding-bottom: 65px;
`;
export const Div = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  width: 100%;
`;
export const Div2 = styled.div`
  margin-top: 15px;
  width: 25%;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
`;
export const Queue = styled.div`
  width: 25%;
  border-right: 1px solid lightgrey;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    box-sizing: border-box;
    width: 40%;
  }
`;
export const Help = styled.div`
  display: flex;
  width: 50%;
  box-sizing: border-box;
  flex-direction: column;
  border-right: 1px solid lightgrey;
  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    box-sizing: border-box;
    width: 100%;
  }
`;

export const Subject = styled.div`
  display: flex;
  background-color: #ffffff;
`;
export const Conversation = styled.div`
  height: 63vh;
  background-color: #eaeaea;
  @media screen and (max-width: 600px) {
    height: 59.5vh;
    box-sizing: border-box;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    box-sizing: border-box;
    width: 100%;
    height: 73.5vh;
  }
`;
export const Message = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  background-color: #dddddd;
`;
export const TitleName = styled.div`
  padding: 20px;
  width: 85%;
  border-right: 1px solid lightgrey;
  background-color: #ffffff;
  @media screen and (max-width: 600px) {
    h4 {
      font-size: 20px;
    }
    h6 {
      font-size: 10px;
    }
  }
`;
export const Field = styled.div`
  width: 100%;
`;
export const Option = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  border-right: 1px solid lightgrey;
  width: 15%;
`;
export const Shared = styled.div`
  display: flex;
  margin-top: 33px;
  padding-bottom: 33px;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
`;
export const More = styled.button`
  border: transparent;
  background: transparent;
  cursor: pointer;
`;
export const Send = styled.button`
  background-color: #2fdc5f;
  color: white;
  border: transparent;
  width: 218px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    box-sizing: border-box;
    width: 100%;
  }
`;
export const Request = styled.button`
  background-color: #372476;
  color: white;
  border: transparent;
  width: 218px;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    box-sizing: border-box;
    width: 100%;
  }
`;
//Login Styles
export const LoginDiv = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100vh;
  @media (min-width: 56px) and (max-width: 320px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 142% 175%;
  }
  @media (min-width: 320px) and (max-width: 400px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 142% 167%;
  }
  @media (min-width: 401px) and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 142% 150%;
  }
  @media (min-width: 601px) and (max-width: 769px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 142% 150%;
  }
  @media (min-width: 775px) and (max-width: 790px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 150% 125%;
  }
  @media (min-width: 790px) and (max-width: 851px) {
    flex-direction: column;
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 130% 125%;
  }
  @media (min-width: 851px) and (max-width: 1024px) {
    display: flex;
    box-sizing: border-box;
    background-image: url(${backgroundImg});
    background-size: 100%;
    background-size: 130% 145%;
    background-repeat: no-repeat;
  }
`;
export const LoginMain = styled.div`
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
  @media (min-width: 601px) and (max-width: 769px) {
    margin-top: -500px;
    width: 100%;
  }
  @media (min-width: 770px) and (max-width: 1024px) {
    margin-top: -650px;
    width: 100%;
  }
  @media (min-width: 1025px) and (max-width: 1245px) {
    width: 33.34%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
`;
export const LoginPic = styled.div`
  p {
    padding-bottom: 750px;
  }
  display: flex;
  width: 67.7%;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #7f25d9;
  background-image: url(${backgroundImg});
  background-size: 120% 120%;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
  @media screen and (max-width: 1500px) {
    display: none;
  }
  @media (min-width: 1025px) and (max-width: 1245px) {
    display: flex;
    width: 67.7%;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #7f25d9;
    background-image: url(${backgroundImg});
    background-size: 120% 127%;
    p {
      padding-bottom: 650px;
    }
  }
`;
export const LoginButton = styled.button`
  margin-top: 40px;
  width: 369px;
  height: 75px;
  left: 985px;
  top: 475px;
  background: linear-gradient(250.94deg, #330066 3.3%, #7f25d9 100.52%);
  border-radius: 100px;
  border: none;
  cursor: pointer;
  @media (min-width: 56px) and (max-width: 320px) {
    width: 25%;
  }
  @media (min-width: 300px) and (max-width: 600px) {
    width: 30%;
  }
  @media screen and (max-width: 600px) {
    width: 55%;
    height: 45px;
  }
  @media (min-width: 601px) and (max-width: 769px) {
    width: 40%;
    height: 45px;
  }
  @media (min-width: 768px) and (max-width: 1000px) {
    width: 32%;
    height: 60px;
  }
  @media (min-width: 1001px) and (max-width: 1023px) {
    width: 30%;
    height: 60px;
  }
  @media (min-width: 1024px) and (max-width: 1500px) {
    width: 65%;
    height: 60px;
  }
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    width: 35%;
  }
`;
export const LoginCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (min-width: 300px) and (max-width: 600px) {
    margin-left: -5px;
    margin-bottom: 8px;
  }
`;

export const LoginFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const Continue = styled.p`
  font-family: "Roboto";
  color: white;
  font-size: 15px;
  @media (min-width: 56px) and (max-width: 300px) {
    font-size: 9px;
    padding-top: 6px;
  }
  @media (min-width: 300px) and (max-width: 600px) {
    font-size: 12px;
    padding-top: 5px;
  }
`;

export const Title = styled.h1`
  font-family: "Roboto";
  color: #330066;
  font-size: 40px;
  @media (min-width: 56px) and (max-width: 300px) {
    font-size: 25px;
    padding-top: 6px;
  }
`;
