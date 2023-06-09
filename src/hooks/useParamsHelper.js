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
    const {addingNewPart, ...paramsWithoutAddingNewConnection} = params
    if (!addingNewConnection) {
      setSearchParams({ ...params, addingNewConnection: true });
    } else {
      setSearchParams({ paramsWithoutAddingNewConnection });
    }
  };

  const manageAddingNewPartParam = () => {
    const {addingNewPart, ...paramsWithoutAddingNewPart} = params
    if (!addingNewPart) {
      setSearchParams({ ...params, addingNewPart: true });
    } else {
      setSearchParams({ paramsWithoutAddingNewPart });
    }
  };

  const manageDdOpenParam = () => {
    const {isDdOpen, ...paramsWithoutDPOpen} = params
    if (!isDdOpen) {
      setSearchParams({ ...params, isDdOpen: true });
    } else {
      setSearchParams({ paramsWithoutDPOpen });
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