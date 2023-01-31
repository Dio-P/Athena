import { useEffect, useMemo } from "react";


const useFindUniqueFolderKeys = (preexistingParts, newParts) => {

  const existingAppsUniqueFolderKeys = useMemo(
    () =>
    !!preexistingParts &&
      Array.from(
        new Set(
          Object.values(preexistingParts).map(
            (part) => part.folderToBeDisplayedIn
          )
        )
      ),
    [preexistingParts]
  );
  
  const newAppsUniqueFoldersKeys = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(newParts).map(
            (part) => part.folderToBeDisplayedIn + ""
          )
        )
      ),
    [newParts]
  );
  
  const allUniqueFolderKeys = useMemo(
    () => !!preexistingParts &&
    [...newAppsUniqueFoldersKeys, ...existingAppsUniqueFolderKeys],
    [newAppsUniqueFoldersKeys, existingAppsUniqueFolderKeys]
  );

  return allUniqueFolderKeys;
}

export default useFindUniqueFolderKeys; 