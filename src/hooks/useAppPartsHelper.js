import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useParamsHelper from "./useParamsHelper";
import useFolderHelper from "./useFolderHelper";

const useAppPartsHelper = (preexistingParts) => {
  const preExistingPartsMemo = useMemo(() => preexistingParts && preexistingParts, [preexistingParts]);

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

  const { keepExistingParams } = useParamsHelper();
  const {
    newlyCreatedFolders,
    setNewlyCreatedFolders, 
    // clickedFolder, 
    setClickedFolder, 
    // newFolderIndexKey
  } = useFolderHelper();

  useEffect(() => {
    console.log("useAppPartHelper"); 
  }, []);

  useEffect(() => {
    console.log("main part helper uef");
    const allAppPartsHelper = {};
    if (preExistingPartsMemo) {
      preExistingPartsMemo.forEach(
        (part) =>
          (allAppPartsHelper[part.name] = {
            ...part,
            clicked: false,
          })
      );
      setAllAppParts(allAppPartsHelper);
    }
  }, [preExistingPartsMemo]);

  const onClickingPart = (part) => {
    console.log("on clicking part out");
    if(part){
      console.log("onClickingPart");
      setAllAppParts({
        ...allAppParts,
        [part.name]: {
          ...allAppParts[part.name],
          clicked: !part.clicked,
        },
      });
    }
    keepExistingParams();
  };

  const addNewPartAndClear = () => {
    console.log("addNewPartAndClear");
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
    !!preExistingPartsMemo &&
      Array.from(
        new Set(
          Object.values(preExistingPartsMemo).map(
            (part) => part.folderToBeDisplayedIn
          )
        )
      ),
    [preExistingPartsMemo]
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
    () => !!preExistingPartsMemo &&
    [...newAppsUniqueFoldersKeys, ...existingAppsUniqueFolderKeys],
    [newAppsUniqueFoldersKeys, existingAppsUniqueFolderKeys]
  );

  return {
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
  };
}

export default useAppPartsHelper; 