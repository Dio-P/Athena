import { useEffect, useState } from "react";


const useFolderHelper = (preexistingFolders, newlyCreatedFolders) => {
  const [newFolderIndexKey, setNewFolderIndexKey] = useState(undefined)

  useEffect(() => {
      if(preexistingFolders){
      const preexistingFoldersLength = preexistingFolders.length - 1 || 0;
      const newlyCreatedFoldersLength = newlyCreatedFolders.length + 1 || 1;
      setNewFolderIndexKey(preexistingFoldersLength + newlyCreatedFoldersLength)
      }
    }, [preexistingFolders, newlyCreatedFolders])
  
  return [newFolderIndexKey]
}

export default useFolderHelper