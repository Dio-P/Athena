import DepAllAppsBox from "./DepAllAppsBox";
import styled from '@emotion/styled';

const DepBoxContainer = styled.div`
  color: red
`;

const DepBox = () => {
  return(
    <DepBoxContainer>
      Hello from DepBox
      <DepAllAppsBox/>
    </DepBoxContainer>
    ) 
}

export default DepBox