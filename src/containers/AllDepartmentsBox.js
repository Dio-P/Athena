import AppsBox from "./AppBox";
import styled from '@emotion/styled';
import { useEffect, useState } from "react";
import FolderIcon from "../components/FolderIcon";

const AllDepartmentsBoxContainer = styled.div`
  margin-left: 10px;
`;

const AllDepBoxTitle = styled.h3`
margin: 0px;
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
      <AllDepBoxTitle>
        Product Group
      </AllDepBoxTitle>
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
        <AppsBox department={department} />
      }
    </AllDepartmentsBoxContainer>
    ) 
}

export default AllDepartmentsBox