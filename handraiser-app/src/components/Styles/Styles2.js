import styled from "styled-components";

export const ListCont = styled.div`
  display: flex;
  flex-direction: row-reverse;
  text-align: "center";
  border: "2px solid gray";
  margin-top: -30px;
  margin-bottom: 20px;
`;

export const TableCol = styled.div`
  display: "inline-block";
  overflow: " hidden";
  text-overflow: "ellipsis";
  white-space: " nowrap";
  width: "250px";
  font-weight: "bold";
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
      padding-left: 65px;
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
      content: "Key: ";
    }
    td:nth-of-type(4):before {
      content: "Email Status: ";
    }
    td:nth-of-type(5):before {
      content: "Status: ";
    }
  }
`;
export const TableStyle2 = styled.div`
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
      content: "Name: ";
    }
    td:nth-of-type(3):before {
      content: "Email: ";
    }
    td:nth-of-type(4):before {
      content: "Status: ";
    }
    td:nth-of-type(5):before {
      content: "Action: ";
    }
  }
`;
export const TableStyle3 = styled.div`
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
      padding-left: 120px;
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
      content: "Class Name: ";
    }
    td:nth-of-type(3):before {
      content: "Description: ";
    }
    td:nth-of-type(4):before {
      content: "Date Created: ";
    }
    td:nth-of-type(5):before {
      content: "Created by: ";
    }
    td:nth-of-type(6):before {
      content: "Status: ";
    }
  }
`;
