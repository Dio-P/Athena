import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

const TeamsBox = ({ alldepartments, defaultDepartment }) => {
  const [chosenTeam, setChosenTeam] = useState("");
  const [chosenDepApps, setChosenDepApps] = useState("");
  const [
    apps,
    loading,
    error
  ]= useTeamAppsNamesSearch(chosenTeam);
  // const [teamUrlParam, setTeamUrlParam] = useState(undefined);
  let [searchParams, setSearchParams] = useSearchParams();
  const teamUrlParam = useMemo(() => {searchParams.get('team')}, [searchParams]);


  const clickIcon = (chosenTeam) => {
    setChosenTeam(chosenTeam);
    // setSearchParams({team:chosenTeam})

  }
  useEffect(() => {
    if(!chosenTeam && teamUrlParam)
    setChosenTeam(teamUrlParam)
  }, [])

  useEffect(() => {
    console.log("teamUrlParam", teamUrlParam);
     
  }, [teamUrlParam])

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
    setSearchParams({team:chosenTeam})
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
          params={searchParams}
          setUrlParams={setSearchParams}
        />
      }
    </TeamsBoxContainer>
    ) 
}

export default TeamsBox

// apps is not returned as should from the hook