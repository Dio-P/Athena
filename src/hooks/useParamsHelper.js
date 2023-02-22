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
    isFolderDdOpen,
  } = params;

  const manageTeamParam = (defaultTeam) => {
    console.log("defaultTeam@", defaultTeam);
    if(!team){
      setSearchParams({team: defaultTeam});
    }
  };  

  const manageAppIdParam = (singleApp) => {
    console.log("manageAppIdParam");

    if(singleApp.id && !appId){
      console.log("singleApp true", singleApp);
      setSearchParams({ team, appId: singleApp.id }) 
    } else {
      setSearchParams({ team });
    }
  };
  
  const manageAddingNewConnectionParam = () => {
    console.log("manageAddingNewConnectionParam");

    if (!addingNewConnection) {
      setSearchParams({ team, appId, addingNewConnection: true });
    } else {
      setSearchParams({ team, appId });
    }
  };

  const manageAddingNewPartParam = () => {
    console.log("manageAddingNewPartParam");
    if (!addingNewPart) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection });
    }
  };

  const manageFolderDdOpenParam = () => {
    console.log("manageFolderDdOpenParam");
    if (!isFolderDdOpen) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart, isFolderDdOpen: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart });
    }
  };

  const keepExistingParams = () => {
    console.log("keepExistingParams");
    setSearchParams({...params});
  };

  return {
    manageTeamParam, 
    manageAddingNewPartParam, 
    manageFolderDdOpenParam, 
    keepExistingParams, 
    manageAddingNewConnectionParam, 
    manageAppIdParam, 
    params
  }
};

export default useParamsHelper;