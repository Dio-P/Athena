import DepAllAppsBox from "./DepAllAppsBox";
import styled from '@emotion/styled';

const AllDepartmentsBoxContainer = styled.div`
  color: red
`;

const AllDepartmentsBox = () => {
  return(
    <AllDepartmentsBoxContainer>
      Hello from AllDepartmentsBox
      <DepAllAppsBox/>
    </AllDepartmentsBoxContainer>
    ) 
}

export default AllDepartmentsBox