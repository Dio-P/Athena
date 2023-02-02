import { useCallback, useEffect, useMemo, useState } from "react";
import useAppPartsHelper from "./useAppPartsHelper";
import useParamsHelper from "./useParamsHelper";


const useFolderHelper = (preexistingFolders) => {
  const preExistingFoldersMemo = useMemo(() => preexistingFolders && preexistingFolders, [preexistingFolders]);

  // const [
    // allAppParts, 
    // newPartsAdded, 
    // setNewPartsAdded, 
    // newPart, 
    // setNewPart,
    // folderOfNewPart, 
    // setFolderOfNewPart,
    // allUniqueFolderKeys, 
    // onClickingPart, 
    // addNewPartAndClear
  // ] = useAppPartsHelper(undefined);
  // const [_, __, keepExistingParams] = useParamsHelper();

  // const newPartMemo =useMemo(() => newPart, [newPart]); 
  // const setNewPartMemo =useCallback(() => setNewPart, [setNewPart]);
  // const setFolderOfNewPartMemo =useCallback(() => setFolderOfNewPart, [setFolderOfNewPart]);

  const [newlyCreatedFolders, setNewlyCreatedFolders] = useState(undefined);
  const [clickedFolder, setClickedFolder] = useState("");
  const [newFolderIndexKey, setNewFolderIndexKey] = useState(undefined);

  // useEffect(() => {
  //   console.log("newPartMemo");
  // }, [newPartMemo])
  // useEffect(() => {
  //   console.log("setNewPartMemo");
  // }, [setNewPartMemo])
  // useEffect(() => {
  //   console.log("setFolderOfNewPartMemo");
  // }, [setFolderOfNewPartMemo])

  useEffect(() => {
      if(preExistingFoldersMemo){
      const preExistingFoldersMemoLength = preExistingFoldersMemo.length - 1 || 0;
      const newlyCreatedFoldersLength = newlyCreatedFolders.length + 1 || 1;
      setNewFolderIndexKey(preExistingFoldersMemoLength + newlyCreatedFoldersLength)
      }
    }, [preExistingFoldersMemo, newlyCreatedFolders]);

    const newFolder = useMemo(()=> ({
      name: clickedFolder,
      id: newFolderIndexKey,
    }), [clickedFolder, newFolderIndexKey]);

    // const addNewFolderAndClear = useCallback(() => {
    //   console.log("addNewFolderAndClear");
    //   setFolderOfNewPartMemo(newFolder);
    //   setNewPartMemo({
    //     ...newPartMemo,
    //     folderToBeDisplayedIn: newFolderIndexKey,
    //   });
    
    //   // keepExistingParams();
    // }, [newFolder]);
  
    // const folderInfoToState = (folder) => {
    //   console.log("folderInfoToState");
    //   setClickedFolder(folder.name);
    //   setFolderOfNewPartMemo(folder);
    //   setNewPartMemo({
    //     ...newPartMemo,
    //     folderToBeDisplayedIn: folder.id,
    //   });
    //   // keepExistingParams();
    // };
  
    // const resetFolderInfo = () => {
    //   console.log("resetFolderInfo");
    //   setFolderOfNewPartMemo("");
    //   // keepExistingParams();
    // };
  
  return [
    newlyCreatedFolders, 
    setNewlyCreatedFolders, 
    clickedFolder, 
    setClickedFolder, 
    newFolderIndexKey,
    // addNewFolderAndClear,
    // folderInfoToState,
    // resetFolderInfo
  ];
}

export default useFolderHelper