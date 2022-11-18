import AppFolder from "../components/AppFolderIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import styled from "@emotion/styled";

const DepAllAppsBox = ({ department }) => {

  const DepartmAppsBoxContainer = styled.div`
    margin-left: 10px;
    color: orange;
  `;

  return (
    <DepartmAppsBoxContainer>
      <h2>{ useCapitaliseFirstLetter(department.name) }</h2>
      <AppFolder/>
    </DepartmAppsBoxContainer>
  )
}

export default DepAllAppsBox