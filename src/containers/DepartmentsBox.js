import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import { useEffect, useState } from "react";
import ButtonIcon from "../components/ButtonIcon";

const DepartmentsBoxContainer = styled.div`
  margin-left: 10px;
`;

const DepBoxTitle = styled.h3`
margin: 0px;
`;

const AllDepartmentsBox = ({ alldepartments }) => {
  const [thosenDepartment, setThosenDepartment] = useState("");

  const clickIcon = (thosenDepartment) => {
    console.log("inside on click ");
    setThosenDepartment(thosenDepartment)
  }

  useEffect(() => {
    setThosenDepartment(alldepartments)
  }, [])

  return(
    <DepartmentsBoxContainer>
      <DepBoxTitle>
        Product Group
      </DepBoxTitle>
        {/* {(alldepartments && !thosenDepartment)
        &&
      <>
        {alldepartments.map((department) => (
          <div onClick={() => clickIcon(department)}>
            <ButtonIcon department={ department }/>
          </div>
        ))}
      </>
        } */}
      {thosenDepartment
      &&
        <AppsBox department={thosenDepartment} />
      }
    </DepartmentsBoxContainer>
    ) 
}

export default AllDepartmentsBox