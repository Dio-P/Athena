import { useEffect, useMemo, useState, useRef } from "react";
import useAppPartsHelper from "./useAppPartsHelper";
import useParamsHelper from "./useParamsHelper";


const useFolderHelper = (preexistingFolders) => {
  const preExistingFoldersMemo = useMemo(() => preexistingFolders, [preexistingFolders])
  console.log("hi folder");


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

  const preexistingFoldersLength = useMemo(() => preExistingFoldersMemo && (preExistingFoldersMemo.length - 1 || 0), [preExistingFoldersMemo]);
  const newlyCreatedFoldersLength = useMemo(() => newlyCreatedFolders && (newlyCreatedFolders.length + 1 || 1), [newlyCreatedFolders]);

  const didMountRef = useRef(false);

  useEffect(() => {
    console.log("useFolderHelper"); 
  }, [])

  useEffect(() => {
      if(preExistingFoldersMemo && !!didMountRef.current){
        console.log("preExistingFoldersMemo uef"); 
        setNewFolderIndexKey(preexistingFoldersLength + newlyCreatedFoldersLength)
      }
      didMountRef.current = true;
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