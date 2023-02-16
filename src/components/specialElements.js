import styled from "@emotion/styled";
import { warningIcon } from "../helpers/svgIcons";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const WarningElementWrapper = styled.div`
  color: red;
  margin: 5px 2px 8px;
`;

const WarningHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WarningIconContainer = styled.div`
  height: 20px;
  width: 20px;
`;

export const WarningElement = ({ label }) => {
  return (
    <WarningElementWrapper>
      <WarningHeaderContainer>
        <WarningIconContainer>
          {warningIcon}
        </WarningIconContainer>
        <strong>Warning: </strong>  
      </WarningHeaderContainer>
      {label}
    </WarningElementWrapper>
  ) 
}