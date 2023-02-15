import { useCallback, useMemo, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";


const useParamsHelper = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const {
    team,
    appId,
    addingNewConnection,
    addingNewPart,
    folderDdOpen,
  } = params;

  const clickingOnTeamMock = (defaultTeam) => {
    console.log("defaultTeam@", defaultTeam);
    if(!team){
      setSearchParams({team: defaultTeam});
    }
  };  

  const toggleAppIdParamOnandOff = (singleApp) => {
    console.log("toggleAppIdParamOnandOff");

    if(singleApp.id && !appId){
      console.log("singleApp true", singleApp);
      setSearchParams({ team, appId: singleApp.id }) 
    } else {
      setSearchParams({ team });
    }
  };
  
  const clickingToAddNewConnection = () => {
    console.log("clickingToAddNewConnection");

    if (!addingNewConnection) {
      setSearchParams({ team, appId, addingNewConnection: true });
    } else {
      setSearchParams({ team, appId });
    }
  };

  const clickingToAddNewPart = () => {
    console.log("clickingToAddNewPart");
    if (!addingNewPart) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection });
    }
  };

  const clickingToAddNewFolder = () => {
    console.log("clickingToAddNewFolder");
    if (!folderDdOpen) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart, folderDdOpen: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart });
    }
  };

  const keepExistingParams = () => {
    console.log("keepExistingParams");
    setSearchParams({...params});
  };

  return {
    clickingOnTeamMock, 
    clickingToAddNewPart, 
    clickingToAddNewFolder, 
    keepExistingParams, 
    clickingToAddNewConnection, 
    toggleAppIdParamOnandOff, 
    params
  }
};

export default useParamsHelper;