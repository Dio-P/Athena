import { useEffect, useMemo, useState, useRef } from "react";
import useParamsHelper from "./useParamsHelper";


const useFolderHelper = (preexistingFolders, newlyCreatedFolders) => {
  console.log("preexistingFolders", preexistingFolders);
  console.log("newlyCreatedFolders", newlyCreatedFolders);

  const {
    keepExistingParams
  } = useParamsHelper();

  const [newFolderIndexKey, setNewFolderIndexKey] = useState(undefined);
  const [clickedFolder, setClickedFolder] = useState("");

  const preexistingFoldersLength = useMemo(() => preexistingFolders && (preexistingFolders.length - 1 || 0), [preexistingFolders]);
  const newlyCreatedFoldersLength = useMemo(() => newlyCreatedFolders && (newlyCreatedFolders.length + 1 || 1), [newlyCreatedFolders]);

  // useEffect(() => {
  //   console.log("setClickedFolder folder was clicked");
  // }, [setClickedFolder])
  // useEffect(() => {
  //   console.log("clickedFolder@@", clickedFolder);
  // }, [clickedFolder])

  useEffect(() => {
      if(preexistingFolders){
        console.log("NewFolderIndexKey:", preexistingFoldersLength+ newlyCreatedFoldersLength);
        setNewFolderIndexKey(preexistingFoldersLength + newlyCreatedFoldersLength)
      }
    }, [preexistingFolders, newlyCreatedFolders]);

      const onClickingPreExistingFolder = (value) => {
        setClickedFolder(value);
        keepExistingParams();


      }
  
  return {
    clickedFolder, 
    setClickedFolder, 
    newFolderIndexKey,
    onClickingPreExistingFolder,
  };
}

export default useFolderHelper

// move this to addNewDocStateManager