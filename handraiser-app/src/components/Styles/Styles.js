import styled from "styled-components";

export const TabBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  @media screen and (max-width: 320px) {
    flex-direction: column;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  @media screen and (max-width: 320px) {
    flex-direction: column;
    padding-top: 10px;
  }
`;

export const RowCont = styled.div`
  text-align: center;
`;
