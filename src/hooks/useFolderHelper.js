import { useEffect, useState } from "react";


const useFolderHelper = (preexistingFolders) => {
  const [newFolderIndexKey, setNewFolderIndexKey] = useState(undefined);
  const [newlyCreatedFolders, setNewlyCreatedFolders] = useState([]);
  const [clickedFolder, setClickedFolder] = useState("");

  useEffect(() => {
      if(preexistingFolders){
      const preexistingFoldersLength = preexistingFolders.length - 1 || 0;
      const newlyCreatedFoldersLength = newlyCreatedFolders.length + 1 || 1;
      setNewFolderIndexKey(preexistingFoldersLength + newlyCreatedFoldersLength)
      }
    }, [preexistingFolders, newlyCreatedFolders])
  
  return [newlyCreatedFolders, setNewlyCreatedFolders, clickedFolder, setClickedFolder, newFolderIndexKey]
}

export default useFolderHelper