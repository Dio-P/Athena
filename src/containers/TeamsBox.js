import { useEffect, useMemo, useState } from "react";
import { useSearchParams, } from "react-router-dom";
import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import GenericButtonIcon from "../components/GenericButtonIcon";
import useTeamAppsNamesSearch from "../hooks/queries/useTeamAppsNamesSearch";
import useParamsHelper from "../hooks/useParamsHelper";

const TeamsBoxContainer = styled.div`
  margin-left: 10px;
`;

const TeamsBoxTitle = styled.h3`
margin: 0px;
`;

const TeamsBox = ({ department, params }) => {
  const {
    clickingOnTeamMock,
    keepExistingParams,
    params:{
      team
    }
  } = useParamsHelper();

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
    if(!chosenTeam && team){
      setChosenTeam(team)
    }
  }, [team]);

  useEffect(() => {
    if(!team){
      console.log("chosenTeam", chosenTeam);
      console.log("team", team);
      clickingOnTeamMock({team:chosenTeam})
    }
  }, [chosenTeam]);

  useEffect(() => {
    setChosenTeam(department)
  }, [department]);

  const clickIcon = (chosenTeam) => {
    setChosenTeam(chosenTeam);
  }

  useEffect(() => {
    if(apps){
      console.log("appsTeamsBox", apps);
      setChosenDepApps(apps)
    }
  }, [apps])

  return(
    <TeamsBoxContainer>
      <TeamsBoxTitle>
        Product Group
      </TeamsBoxTitle>
        {
          (department && !chosenTeam)
          &&

      // <>
      //   {departments.map((department) => (
          <div onClick={() => clickIcon(chosenTeam)}>
            <GenericButtonIcon department={ chosenTeam }/>
          </div>
      //   ))}
      // </>
        }
      {(chosenTeam && chosenDepApps)
      &&
        <AppsBox
          department={chosenTeam}
          teamApps={chosenDepApps}
          teamName={chosenTeam}
          params={params || newParams}
        />
      }
    </TeamsBoxContainer>
    ) 
}

export default TeamsBox
// maybe is the api call that is actually breaking for some reason.

// bug when allready in team and pressing back to query with app, 
// app page does not appear because the app component wher the logic is 
// is not rerendering. 