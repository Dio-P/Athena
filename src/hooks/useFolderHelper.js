import { useEffect, useMemo, useState, useRef } from "react";
import useParamsHelper from "./useParamsHelper";


const useFolderHelper = (preexistingFolders) => {
  const preExistingFoldersMemo = useMemo(() => preexistingFolders, [preexistingFolders])

  const {
    keepExistingParams
  } = useParamsHelper();

  const [newFolderIndexKey, setNewFolderIndexKey] = useState(undefined);
  const [newlyCreatedFolders, setNewlyCreatedFolders] = useState([]);
  const [clickedFolder, setClickedFolder] = useState("");

  const preexistingFoldersLength = useMemo(() => preExistingFoldersMemo && (preExistingFoldersMemo.length - 1 || 0), [preExistingFoldersMemo]);
  const newlyCreatedFoldersLength = useMemo(() => newlyCreatedFolders && (newlyCreatedFolders.length + 1 || 1), [newlyCreatedFolders]);

  const didMountRef = useRef(false);

  useEffect(() => {
      if(preExistingFoldersMemo && !!didMountRef.current){
        setNewFolderIndexKey(preexistingFoldersLength + newlyCreatedFoldersLength)
      }
      didMountRef.current = true;
    }, [preExistingFoldersMemo, newlyCreatedFolders]);

      const onClickingPreExistingFolder = (value) => {
        setClickedFolder(value);
        keepExistingParams();


      }
  
  return {
    newlyCreatedFolders, 
    setNewlyCreatedFolders, 
    clickedFolder, 
    setClickedFolder, 
    newFolderIndexKey,
    onClickingPreExistingFolder,
  };
}

export default useFolderHelper

// move this to addNewDocStateManager