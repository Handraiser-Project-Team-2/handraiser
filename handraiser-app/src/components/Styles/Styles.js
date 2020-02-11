import styled from "styled-components";
import backgroundImg from "../images/programmer_1.png";

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
  margin-left: -37px;
  margin-top: -5px;
`;
export const TableStyle = styled.div`
  @media only screen and (max-width: 750px) {
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
      display: flex;
      flex-direction: row;
      border: none;
      position: relative;
      padding-left: 70px;
    }
    td:before {
      position: absolute;
      align-items: center;
      top: 6px;
      left: 6px;
      width: 20%;
      padding: 10px;
    }
    td:nth-of-type(2):before {
      content: "Email: ";
    }
    td:nth-of-type(3):before {
      content: "Status: ";
    }
    td:nth-of-type(4):before {
      content: "Key: ";
    }
    td:nth-of-type(5):before {
      content: "Action: ";
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
  width: 25%;
  @media (min-width: 100px) and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 601px) and (max-width: 1024px) {
    display: none;
  }
`;
export const Queue = styled.div`
  width: 25%;
  border-right: 1px solid lightgrey;
  @media (min-width: 100px) and (max-width: 768px) {
    display: none;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
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
  @media (min-width: 100px) and (max-width: 600px) {
    box-sizing: border-box;
    width: 100%;
  }
  @media (min-width: 601px) and (max-width: 1024px) {
    box-sizing: border-box;
    width: 100%;
  }
`;
export const Subject = styled.div`
  display: flex;
  background-color: #ffffff;
`;
export const Conversation = styled.div`
  height: 636.1px;
  overflow: auto;
  background-color: #eaeaea;
  @media (min-width: 300px) and (max-width: 1700px) {
    height: 545px;
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
`;
export const Field = styled.div`
  width: 100%;
`;
export const Option = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  border-right: 1px solid lightgrey;
  width: 145px;
`;
export const Shared = styled.div`
  display: flex;
  margin-top: 33px;
  padding-bottom: 31px;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
  @media (min-width: 100px) and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 15px;
    h6 {
      font-size: 20px;
    }
  }
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
  margin-right: 15px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    box-sizing: border-box;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    box-sizing: border-box;
  }
`;
//Login Styles
export const LoginDiv = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100vh;
  @media (min-width: 100px) and (max-width: 400px) {
    background-image: url(${backgroundImg});
    background-size: 145%;
    background-repeat: no-repeat;
    background-position: -60px bottom;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    background-image: url(${backgroundImg});
    background-size: 145%;
    background-repeat: no-repeat;
    background-position: -85px bottom;
  }
  @media (min-width: 600px) and (max-width: 940px) {
    justify-content: center;
    background-image: url(${backgroundImg});
    background-size: 135%;
    background-repeat: no-repeat;
    background-position: -115px bottom;
  }
  @media (min-width: 1024px) and (max-width: 1500px) {
    display: flex;
    box-sizing: border-box;
    height: 100vh;
  }
`;
export const LoginMain = styled.div`
  width: 33.34%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  @media (min-width: 100px) and (max-width: 600px) {
    margin-top: -400px;
    width: 100%;
  }
  @media (min-width: 600px) and (max-width: 940px) {
    margin-top: -600px;
    width: 100%;
  }
`;
export const LoginPic = styled.div`
  display: flex;
  width: 67.7%;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #7f25d9;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: -174px center;
  p {
    padding-bottom: 850px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 600px) and (max-width: 940px) {
    display: none;
  }
  @media (min-width: 940px) and (max-width: 1024px) {
    display: flex;
    width: 67.7%;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #7f25d9;
    background-image: url(${backgroundImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -450px bottom;
  }
  @media (min-width: 1024px) and (max-width: 1500px) {
    display: flex;
    width: 67.7%;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #7f25d9;
    background-image: url(${backgroundImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -350px bottom;
  }
`;
export const LoginButton = styled.button`
  margin-top: 40px;
  width: 275px;
  padding: 10px;
  background: linear-gradient(250.94deg, #330066 3.3%, #7f25d9 100.52%);
  border-radius: 100px;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 230px;
  }
  @media (min-width: 600px) and (max-width: 768px) {
    width: 260px;
  }
`;
export const LoginCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const LoginFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
export const Continue = styled.p`
  font-family: "Roboto";
  color: white;
  font-size: 15px;
  margin-top: 13px;
  @media screen and (max-width: 500px) {
    font-size: 12.5px;
  }
`;
export const Title = styled.h1`
  font-family: Roboto;
  color: #330066;
  font-size: 40px;
  @media (min-width: 56px) and (max-width: 300px) {
    font-size: 25px;
    padding-top: 6px;
  }
`;
export const Quotes = styled.div`
  font-family: Oxygen;
  color: white;
  font-size: 30px;
  align-self: center;
  margin-bottom: 820px;
  @media (min-width: 940px) and (max-width: 1750px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 750px;
  }
`;
