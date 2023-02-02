import { useEffect, useMemo, useState } from "react";
import { useSearchParams, } from "react-router-dom";
import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import GenericButtonIcon from "../components/GenericButtonIcon";
import useTeamAppsNamesSearch from "../hooks/queries/useTeamAppsNamesSearch";

const TeamsBoxContainer = styled.div`
  margin-left: 10px;
`;

const TeamsBoxTitle = styled.h3`
margin: 0px;
`;

const TeamsBox = ({ defaultDepartment, params }) => {
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
    if(!chosenTeam && params.team){
      setChosenTeam(params.team)
    }
  }, [params]);

  useEffect(() => {
    if(!params.team){
      setSearchParams({team:chosenTeam})
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

// bug when allready in team and pressing back to query with app, 
// app page does not appear because the app component wher the logic is 
// is not rerendering. 