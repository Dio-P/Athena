import DepartmAppsBox from "./DepartmAppsBox";
import styled from '@emotion/styled';
import { useState } from "react";
import AppFolderIcon from "../components/AppFolderIcon";

const AllDepartmentsBoxContainer = styled.div`
  margin-left: 10px;
`;

const AllDepartmentsBox = ({ alldepartments }) => {
  const [department, setDepartment] = useState("");

  const clickIcon = (department) => {
    setDepartment(department)
  }

  return(
    <AllDepartmentsBoxContainer>
      <h2>Product Group</h2>
        {(alldepartments && !department)
        &&
      <>
        {alldepartments.map((department) => (
          <AppFolderIcon onClick={clickIcon} department={ department }/>
        ))}
      </>
        }
      {department
      &&
        <DepartmAppsBox department={department} />
      }
    </AllDepartmentsBoxContainer>
    ) 
}

export default AllDepartmentsBox