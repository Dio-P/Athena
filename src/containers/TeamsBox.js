import { useEffect, useMemo, useState } from "react";
import { 
  useSearchParams,
  useNavigate
 } from "react-router-dom";
import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import ButtonIcon from "../components/ButtonIcon";
import useTeamAppsNamesSearch from "../hooks/queries/useTeamAppsNamesSearch";
import useValuesFromUrlParams from "../hooks/useValuesFromUrlParams";

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
  // const [teamUrlParam, setTeamUrlParam] = useState(undefined);
  let [searchParams, setSearchParams] = useSearchParams();
  const newParams = Object.fromEntries([...searchParams]);
  // const teamUrlParam = useMemo(() => {searchParams.get('team')}, [searchParams]);
  // const params = useValuesFromUrlParams();
  // const [teamParam, appIdParam] = useValuesFromUrlParams()
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("params teamsBox@", params);
    if(!chosenTeam && params.team){
      setChosenTeam(params.team)
    }
  }, []);

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


  // useEffect(() => {
  //   gettingParamsValues()
  // }, []);

  // const gettingParamsValues = () => {
  //   console.log("inside getting params values");
  //   const paramValuesFromTeamsBox = Object.fromEntries([...searchParams]);
  //   console.log("paramValuesFromTeamsBox!@£", paramValuesFromTeamsBox);
  //   console.log("teamParam, appIdParam", teamParam, appIdParam);
  //   setSearchParams(paramValuesFromTeamsBox);
  // }
  // useEffect(() => {
  //   console.log("chosenTeam@@@", chosenTeam);
  //   console.log("chosenDepApps@@@", chosenDepApps);
  // }, [chosenTeam, chosenDepApps]);

  // useEffect(() => {
  //   console.log("params in teamsBox@!@!", teamParam);
  //   if(!chosenTeam && teamParam && !appIdParam){
  //     setChosenTeam(teamParam)
  //   }
  //   if(!chosenTeam && teamParam && appIdParam){
  //     setChosenTeam(teamParam)
  //   }
  // }, [teamParam, appIdParam])

  
  // useEffect(() => {
  //   if(!chosenTeam && teamUrlParam)
  //   setChosenTeam(teamUrlParam)
  // }, [])

  // useEffect(() => {
  //   console.log("teamUrlParam", teamUrlParam);
     
  // }, [teamUrlParam])

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
          // setUrlParams={setSearchParams}
        />
      }
    </TeamsBoxContainer>
    ) 
}

export default TeamsBox

// apps is not returned as should from the hook