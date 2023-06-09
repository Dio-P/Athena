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
    isDdOpen,
  } = params;

  const manageTeamParam = (defaultTeam) => {
    if(!team){
      setSearchParams({team: defaultTeam});
    }
  };  

  const manageAppIdParam = (singleApp) => {

    if(singleApp.id && !appId){
      setSearchParams({ team, appId: singleApp.id }) 
    } else {
      setSearchParams({ team });
    }
  };
  
  const manageAddingNewConnectionParam = () => {
    if (!addingNewConnection) {
      setSearchParams({ team, appId, addingNewConnection: true });
    } else {
      setSearchParams({ team, appId });
    }
  };

  const manageAddingNewPartParam = () => {
    if (!addingNewPart) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection });
    }
  };

  const manageDdOpenParam = () => {
    const {isDdOpen, ...paramsNoDPOpen} = params
    if (!isDdOpen) {
      setSearchParams({ ...params, isDdOpen: true });
    } else {
      setSearchParams({ paramsNoDPOpen });
    }
  };

  const keepExistingParams = () => {
    setSearchParams({...params});
  };

  return {
    manageTeamParam, 
    manageAddingNewPartParam, 
    manageDdOpenParam, 
    keepExistingParams, 
    manageAddingNewConnectionParam, 
    manageAppIdParam, 
    params
  }
};

export default useParamsHelper;