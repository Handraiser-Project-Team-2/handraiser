import styled from "styled-components";

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
  @media only screen and (max-width: 425px),
    (height: 1024px) and (width: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: landscape),
    (width: 1024px) and (height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
    td,
    tr {
      display: block;
    }
    thead tr {
      display: none;
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      border-bottom: 3px solid lightgray;
      border-radius: 10px;
    }
    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 25%;
    }
    td:before {
      position: absolute;
      top: 10px;
      left: 6px;
      width: 100%;
      padding: 10px;
      white-space: nowrap;
    }
    td:nth-of-type(1):before {
      content: "Email";
    }
    td:nth-of-type(2):before {
      content: "Key";
    }
    td:nth-of-type(3):before {
      content: "Action";
    }
  }
`;

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
