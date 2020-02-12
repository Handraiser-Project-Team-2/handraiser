import styled from "styled-components";

//Student-Table

// export const Row = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

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
