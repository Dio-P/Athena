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

  const [
    allAppParts, 
    newPartsAdded, 
    setNewPartsAdded, 
    newPart, 
    setNewPart,
    folderOfNewPart, 
    setFolderOfNewPart,
    allUniqueFolderKeys, 
    onClickingPart, 
    addNewPartAndClear
  ] = useAppPartsHelper();

  const [
    newlyCreatedFolders, 
    setNewlyCreatedFolders, 
    clickedFolder, 
    setClickedFolder, 
    newFolderIndexKey,
    addNewFolderAndClear,
    folderInfoToState,
    resetFolderInfo
  ] = useFolderHelper();

  useEffect(() => {
    console.log("useParamsHelper");
  }, []);

  const setAppToDisplay = (singleApp) => {
    if(!appId){
      setSearchParams({ team, appId: singleApp.id }) 
    } else {
      setSearchParams({ team });
    }
  };
  
  const clickingToAddNewConnection = () => {
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

  const keepExistingParams = useCallback(() => {
    console.log("keepExistingParams");
    const params = Object.fromEntries([...searchParams]);
    setSearchParams({...params});
  }, [addNewFolderAndClear, folderInfoToState, resetFolderInfo, onClickingPart, addNewPartAndClear] );

  return {clickingToAddNewPart, clickingToAddNewFolder, keepExistingParams, clickingToAddNewConnection, setAppToDisplay, params}
};

export default useParamsHelper;