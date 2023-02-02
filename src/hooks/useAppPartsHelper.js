import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useParamsHelper from "./useParamsHelper";
import useFolderHelper from "./useFolderHelper";

const useAppPartsHelper = (preexistingParts) => {
  const [allAppParts, setAllAppParts] = useState([]);
  const [newPartsAdded, setNewPartsAdded] = useState("");

  const [folderOfNewPart, setFolderOfNewPart] = useState("");
  const [newPart, setNewPart] = useState({
    name: "",
    id: uuidv4(),
    ghRepo: "",
    type: "",
    folderToBeDisplayedIn: "",
  });

  const [_, __, keepExistingParams] = useParamsHelper();
  const [
    newlyCreatedFolders,
    setNewlyCreatedFolders, 
    clickedFolder, 
    setClickedFolder, 
    newFolderIndexKey
  ] = useFolderHelper();


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

  const onClickingPart = (part) => {
    setAllAppParts({
      ...allAppParts,
      [part.name]: {
        ...allAppParts[part.name],
        clicked: !part.clicked,
      },
    });
    keepExistingParams();
  };

  const addNewPartAndClear = () => {
    setNewPartsAdded({
      ...newPartsAdded,
      [newPart.name]: {
        ...newPart,
        folderToBeDisplayedIn:
          folderOfNewPart.id || Object.values(folderOfNewPart)[0].id,
        // I need to create a singly function that is going to turn this and return a single item in both cases
      },
    });
    setNewlyCreatedFolders([...newlyCreatedFolders, folderOfNewPart]); //////////////////////////////////
    setNewPart({
      ...newPart,
      name: "",
      ghRepo: "",
      type: "",
    });
    setClickedFolder("");
    setFolderOfNewPart("");
    keepExistingParams();
  };

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
          Object.values(newPartsAdded).map(
            (part) => part.folderToBeDisplayedIn + ""
          )
        )
      ),
    [newPartsAdded]
  );
  
  const allUniqueFolderKeys = useMemo(
    () => !!preexistingParts &&
    [...newAppsUniqueFoldersKeys, ...existingAppsUniqueFolderKeys],
    [newAppsUniqueFoldersKeys, existingAppsUniqueFolderKeys]
  );

  return [
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
  ];
}

export default useAppPartsHelper; 