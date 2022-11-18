import FolderIcon from "../components/FolderIcon";
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
      {department.apps
      &&
        department.apps.map((app) => (
          <FolderIcon app={ app }/>
        ))
      }

    </DepartmAppsBoxContainer>
  )
}

export default DepAllAppsBox