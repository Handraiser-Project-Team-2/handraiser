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
