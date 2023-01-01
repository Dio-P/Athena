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
  const [chosenTeam, setChosenTeam] = useState("");
  const [chosenDepApps, setChosenDepApps] = useState("");
  const [
    apps,
    loading,
    error
  ]= useTeamAppsNamesSearch(chosenTeam)

  const clickIcon = (chosenTeam) => {
    setChosenTeam(chosenTeam);

  }

  useEffect(() => {
    console.log("apps", apps);
    if(apps){
      setChosenDepApps(apps)
    }
  }, [apps])

  useEffect(() => {
    setChosenTeam(defaultDepartment)
  }, [defaultDepartment]);
  useEffect(() => {
  }, [chosenTeam]);

  return(
    <TeamsBoxContainer>
      <TeamsBoxTitle>
        Product Group
      </TeamsBoxTitle>
        {
          (defaultDepartment && !chosenTeam)
          &&
      // <>
      //   {departments.map((department) => (
          <div onClick={() => clickIcon(chosenTeam)}>
            <ButtonIcon department={ chosenTeam }/>
          </div>
      //   ))}
      // </>
        }
      {(chosenTeam && chosenDepApps)
      &&
        <AppsBox
          department={chosenTeam}
          teamApps={chosenDepApps}
          team={chosenTeam}
        />
      }
    </TeamsBoxContainer>
    ) 
}

export default TeamsBox

// apps is not returned as should from the hook