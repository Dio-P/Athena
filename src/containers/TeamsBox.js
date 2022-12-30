import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import { useEffect, useState } from "react";
import ButtonIcon from "../components/ButtonIcon";
import useTeamAppsNamesSearch from "../hooks/queries/useTeamAppsNamesSearch";

const TeamsBoxContainer = styled.div`
  margin-left: 10px;
`;

const TeamsBoxTitle = styled.h3`
margin: 0px;
`;

const AllDepartmentsBox = ({ alldepartments, defaultDepartment }) => {
  const [chosenDepartment, setChosenDepartment] = useState("");
  const [chosenDepApps, setChosenDepApps] = useState("");
  const {
    apps,
    loading,
    error
  }= useTeamAppsNamesSearch(chosenDepartment)

  const clickIcon = (chosenDepartment) => {
    console.log("inside on click ");
    setChosenDepartment(chosenDepartment);

  }

  useEffect(() => {
    console.log("appsInside@", apps);
    setChosenDepApps(apps)
  }, [apps])

  // useEffect(() => {
  //   setChosenDepartment(alldepartments)
  // }, [defaultDepartment]);

  return(
    <TeamsBoxContainer>
      <TeamsBoxTitle>
        Product Group
      </TeamsBoxTitle>
        {
          (defaultDepartment && !chosenDepartment)
          &&
      // <>
      //   {departments.map((department) => (
          <div onClick={() => clickIcon(chosenDepartment)}>
            <ButtonIcon department={ chosenDepartment }/>
          </div>
      //   ))}
      // </>
        }
      {(chosenDepartment && chosenDepApps)
      &&
        <AppsBox
          department={chosenDepartment}
          depApps={chosenDepApps}
        />
      }
    </TeamsBoxContainer>
    ) 
}

export default AllDepartmentsBox