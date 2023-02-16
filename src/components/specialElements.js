import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const WarningElementWrapper = styled.div`
  color: red;
  margin: 5px 2px 8px;
`;

export const WarningElement = ({ label }) => {
  return (
    <WarningElementWrapper>
      <strong>Warning: </strong>  
      {label}
    </WarningElementWrapper>
  ) 
}