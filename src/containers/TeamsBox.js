import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from "react";
import ButtonIcon from "../components/ButtonIcon";
import useTeamAppsNamesSearch from "../hooks/queries/useTeamAppsNamesSearch";

const TeamsBoxContainer = styled.div`
  margin-left: 10px;
`;

const TeamsBoxTitle = styled.h3`
margin: 0px;
`;

const TeamsBox = ({ alldepartments, defaultDepartment }) => {
  const [chosenDepartment, setChosenDepartment] = useState("");
  const [chosenDepApps, setChosenDepApps] = useState("");
  const [
    apps,
    loading,
    error
  ]= useTeamAppsNamesSearch(chosenDepartment)

  const clickIcon = (chosenDepartment) => {
    console.log("inside on click ");
    setChosenDepartment(chosenDepartment);

  }

  useEffect(() => {
    if(apps){
      console.log("appsInside@", apps);
      setChosenDepApps(apps)
    }
  }, [apps])

  useEffect(() => {
    console.log("default dep is about to set chosen dep");
    setChosenDepartment(defaultDepartment)
  }, [defaultDepartment]);
  useEffect(() => {
    console.log("chosenDepartment", chosenDepartment);
  }, [chosenDepartment]);

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

export default TeamsBox

// apps is not returned as should from the hook