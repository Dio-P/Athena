import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { deleteIcon } from "../helpers/svgIcons";
import ManageAppDetails from "../components/ManageAppDetails";
import ManageFoldersDetails from "../components/ManageFoldersDetails";
import styleVariables from "../styleVariables";
import useUpdateAppById from "../hooks/queries/useAppByIdUpdate";

const EditAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${styleVariables.colours.primaryLight};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: start;
`;

const EditApp = ({ setIsPopUpOpen, app }) => {
  const initialApp = useMemo(() => app, [app])
  const [updatedApp, setUpdatedApp] = useState(undefined);
  const [updateWasClicked, setUpdatedWasClicked] = useState(false);
  // pass the whole app in here /\
  const [data, loading, error] = useUpdateAppById(updatedApp?.id, updatedApp, updateWasClicked);

  useEffect(() => {
    console.log("updatedApp", updatedApp);
  }, [updatedApp]);

  useEffect(() => {
    if(error){
      console.log("error", error);
    }
    if(loading){
      console.log("loading", loading);
    }
    if(data){
      console.log("data", data);
    }
  }, [data, loading, error]);

  // find why the bellow ends up with a string and not an array
  // ones it gets a string and then an array.
  const stringToArray = (string) => {
    console.log("string", string);
    console.log("type of string", typeof string);
    const arrayOfTeams = string[0].split(",");
    console.log("arrayOfTeams", arrayOfTeams);
    const trimTeams = arrayOfTeams.map((team) => (
      team.trim()
    ))
    console.log("trimTeams", trimTeams);
    return trimTeams;
  }

  const saveChanges = async() => {
    const teamsToArray = await stringToArray(updatedApp.teams);
    console.log("teamsToArray", teamsToArray);
    setUpdatedApp({...updatedApp, teams: teamsToArray})
    console.log("updatedApp", updatedApp);
    setUpdatedWasClicked(true);
    
  };

  return (
    // <EditAppWrapper>
    //   <GenericButtonIcon
    //     onClickFunction={() => setIsPopUpOpen(false)}
    //     type="small"
    //     icon={deleteIcon}
    //   />
    <>
      <Body>
        <ManageAppDetails
          app={initialApp}
          setUpdatedApp={setUpdatedApp}
        />
        <ManageFoldersDetails
          app={initialApp}
          setUpdatedApp={setUpdatedApp}
        />
      </Body>
      <GenericButtonIcon
        type="add"
        label="update details"
        onClickFunction={saveChanges}
      />
    </>
    // </EditAppWrapper>
  );
};

export default EditApp;
