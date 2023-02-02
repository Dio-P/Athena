import { useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAppPartsHelper from "./useAppPartsHelper";
import useFolderHelper from "./useFolderHelper";


const useParamsHelper = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);

  const {
    team,
    appId,
    addingNewConnection,
    addingNewPart,
    addingNewFolder,
  } = params;

  useEffect(() => {
    console.log("useParamsHelper");
  }, []);

  const toggleAppIdParamOnandOff = (singleApp) => {
    console.log("toggleAppIdParamOnandOff");

    if(!appId){
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

  return {clickingToAddNewPart, clickingToAddNewFolder, keepExistingParams, clickingToAddNewConnection, toggleAppIdParamOnandOff, params}
};

export default useParamsHelper;