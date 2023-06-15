import { useEffect, useMemo, useState, useRef } from "react";
import AppsBox from "./AppsBox";
import styled from '@emotion/styled';
import GenericButtonIcon from "../components/GenericButtonIcon";
import useTeamAppsNamesSearch from "../hooks/queries/useTeamAppsNamesSearch";
import useParamsHelper from "../hooks/useParamsHelper";
import PopulateButtons from "./PopulateButtons";

const TeamsBoxContainer = styled.div`
  margin-left: 10px;
`;

const TeamsBoxTitle = styled.h3`
margin: 0px;
`;

const TeamsBox = ({ 
  department,
}) => {
  const didMountRef = useRef(false);
  const departmentMemo = useMemo(() => department, [department]);
  const {
    manageTeamParam,
    params:{
      team
    }
  } = useParamsHelper();

  const [chosenTeam, setChosenTeam] = useState(undefined);
  const [chosenDepApps, setChosenDepApps] = useState("");

  const [
    apps,
    loading,
    error
  ]= useTeamAppsNamesSearch(chosenTeam);

  useEffect(() => {
    if(!chosenTeam && team){
      setChosenTeam(team)
    }
  }, [team]);

  useEffect(() => {
    if(!team){
      manageTeamParam(chosenTeam)
    }
  }, [chosenTeam]);

  useEffect(() => {
    if(departmentMemo && !!didMountRef.current){
      setChosenTeam(departmentMemo)
    };
    didMountRef.current = true;
  }, [departmentMemo]);

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
          teamApps={chosenDepApps}
          teamName={chosenTeam}
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