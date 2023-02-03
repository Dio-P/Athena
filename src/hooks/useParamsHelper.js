import { useCallback, useMemo, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useAppPartsHelper from "./useAppPartsHelper";
import useFolderHelper from "./useFolderHelper";


const useParamsHelper = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  // const changeInParams = useMemo(() => Object.fromEntries([...params]), [params]);
  const paramsString = useRef(searchParams.toString())
  // useMemo(() => searchParams.toString(), [searchParams]);
  const [params, setParams] = useState(Object.fromEntries([...searchParams]));
  // console.log("params", params.team);
  const {
    team,
    appId,
    addingNewConnection,
    addingNewPart,
    addingNewFolder,
  } = params;

//  const paramsStrMemo = useMemo(() => Object.values(changeInParams).join(''), [changeInParams])

  useEffect(() => {
    console.log("paramsString", paramsString);
    console.log("searchParamsparams.toString()", searchParams.toString());
    console.log("paramsStrMemo", typeof changeInParams);
    setParams(Object.fromEntries([...searchParams]))
  }, [paramsString.current]);

  useEffect(() => {
    console.log("useParamsHelper");
  }, []);
  // useEffect(() => {
  //   console.log("params changed");
  // }, [params]);

  const clickingOnTeamMock = (defaultTeam) => {
    console.log("clickingOnTeamMock@");
    if(!team){
      setSearchParams({team: defaultTeam});
    }
  };  

  const toggleAppIdParamOnandOff = (singleApp) => {
    console.log("toggleAppIdParamOnandOff");

    if(singleApp.id && !appId){
      console.log("singleApp", singleApp);
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
    if (!addingNewFolder) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart, addingNewFolder: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart });
    }
  };

  const keepExistingParams = () => {
    console.log("keepExistingParams");
    const params = Object.fromEntries([...searchParams]);
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