import { useEffect, useMemo, useState } from "react";
import useAppPartsHelper from "./useAppPartsHelper";
import useParamsHelper from "./useParamsHelper";


const useFolderHelper = (preexistingFolders) => {
  const preExistingFoldersMemo = useMemo(() => preexistingFolders, [preexistingFolders])


  // const {
  //   allAppParts, 
  //   newPartsAdded, 
  //   setNewPartsAdded, 
  //   newPart, 
  //   setNewPart,
  //   folderOfNewPart, 
  //   setFolderOfNewPart,
  //   allUniqueFolderKeys, 
  //   onClickingPart, 
  //   addNewPartAndClear
  // } = useAppPartsHelper();

  const { keepExistingParams } = useParamsHelper();

  const [newFolderIndexKey, setNewFolderIndexKey] = useState(undefined);
  const [newlyCreatedFolders, setNewlyCreatedFolders] = useState([]);
  const [clickedFolder, setClickedFolder] = useState("");

  useEffect(() => {
    console.log("useFolderHelper"); 
  }, [])

  useEffect(() => {
      if(preExistingFoldersMemo){
        console.log("preExistingFoldersMemo uef");
      const preexistingFoldersLength = preExistingFoldersMemo.length - 1 || 0;
      const newlyCreatedFoldersLength = newlyCreatedFolders.length + 1 || 1;
      setNewFolderIndexKey(preexistingFoldersLength + newlyCreatedFoldersLength)
      }
    }, [preExistingFoldersMemo, newlyCreatedFolders]);

  if(preExistingFoldersMemo){

  
      // const addNewFolderAndClear = () => {
      //   const newFolder = {
      //     name: clickedFolder,
      //     id: newFolderIndexKey,
      //   };
      //   setFolderOfNewPart(newFolder);
      //   setNewPart({
      //     ...newPart,
      //     folderToBeDisplayedIn: newFolderIndexKey,
      //   });
      
      //   keepExistingParams();
      // };
    
      // const folderInfoToState = (folder) => {
      //   setClickedFolder(folder.name);
      //   setFolderOfNewPart(folder);
      //   setNewPart({
      //     ...newPart,
      //     folderToBeDisplayedIn: folder.id,
      //   });
      //   keepExistingParams();
      // };
    
      // const resetFolderInfo = () => {
      //   setFolderOfNewPart("");
      //   keepExistingParams();
      // };
  }

  
  return {
    newlyCreatedFolders, 
    setNewlyCreatedFolders, 
    clickedFolder, 
    setClickedFolder, 
    newFolderIndexKey,
    // addNewFolderAndClear,
    // folderInfoToState,
    // resetFolderInfo
  };
}

export default useFolderHelper