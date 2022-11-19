import DepartmAppsBox from "./DepartmAppsBox";
import styled from '@emotion/styled';
import { useEffect, useState } from "react";
import FolderIcon from "../components/FolderIcon";

const AllDepartmentsBoxContainer = styled.div`
  margin-left: 10px;
`;

const AllDepartmentsBox = ({ alldepartments }) => {
  const [department, setDepartment] = useState("");

  const clickIcon = (department) => {
    console.log("inside on click ");
    setDepartment(department)
  }

  useEffect(() => {
    setDepartment(alldepartments)
  }, [])

  return(
    <AllDepartmentsBoxContainer>
      <h2>Product Group</h2>
        {/* {(alldepartments && !department)
        &&
      <>
        {alldepartments.map((department) => (
          <div onClick={() => clickIcon(department)}>
            <FolderIcon department={ department }/>
          </div>
        ))}
      </>
        } */}
      {department
      &&
        <DepartmAppsBox department={department} />
      }
    </AllDepartmentsBoxContainer>
    ) 
}

export default AllDepartmentsBox