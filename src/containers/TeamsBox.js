import { useEffect, useMemo, useState } from "react";
import { useSearchParams, } from "react-router-dom";
import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import ButtonIcon from "../components/ButtonIcon";
import useTeamAppsNamesSearch from "../hooks/queries/useTeamAppsNamesSearch";

const TeamsBoxContainer = styled.div`
  margin-left: 10px;
`;

const TeamsBoxTitle = styled.h3`
margin: 0px;
`;

const TeamsBox = ({ defaultDepartment, params, updatingParams }) => {
  const [chosenTeam, setChosenTeam] = useState("");
  const [chosenDepApps, setChosenDepApps] = useState("");
  const [
    apps,
    loading,
    error
  ]= useTeamAppsNamesSearch(chosenTeam);
  let [searchParams, setSearchParams] = useSearchParams();
  const newParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    console.log("params teamsBox@", params);
    if(!chosenTeam && params.team){
      setChosenTeam(params.team)
    }
  }, []);

  useEffect(() => {
    if(!params.team){
      updatingParams({team:chosenTeam})
    }
  }, [chosenTeam]);

  useEffect(() => {
    setChosenTeam(defaultDepartment)
  }, [defaultDepartment]);

  const clickIcon = (chosenTeam) => {
    setChosenTeam(chosenTeam);
  }

  useEffect(() => {
    if(apps){
      setChosenDepApps(apps)
    }
  }, [apps])

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
          params={params || newParams}
          updatingParams={updatingParams}
        />
      }
    </TeamsBoxContainer>
    ) 
}

export default TeamsBox

// there is a bug when clicking on the previous box the parameters are getting lost.