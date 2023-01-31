import { useEffect, useMemo, useState } from "react";


const useAppPartsHelper = (preexistingParts, newParts) => {
  const [allAppParts, setAllAppParts] = useState([]);


  useEffect(() => {
    const allAppPartsHelper = {};
    if (preexistingParts) {
      preexistingParts.forEach(
        (part) =>
          (allAppPartsHelper[part.name] = {
            ...part,
            clicked: false,
          })
      );
      setAllAppParts(allAppPartsHelper);
    }
  }, [preexistingParts]);

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

  return [allAppParts, setAllAppParts, allUniqueFolderKeys];
}

export default useAppPartsHelper; 