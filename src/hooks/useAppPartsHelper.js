import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useParamsHelper from "./useParamsHelper";
import useFolderHelper from "./useFolderHelper";

const useAppPartsHelper = (preexistingParts) => {
  const preExistingPartsMemo = useMemo(() => preexistingParts && preexistingParts, [preexistingParts]);

  const [allAppParts, setAllAppParts] = useState(undefined);
  const [newPartsAdded, setNewPartsAdded] = useState(undefined);

  const [folderOfNewPart, setFolderOfNewPart] = useState(undefined);
  const [newPart, setNewPart] = useState({
    name: "",
    id: uuidv4(),
    ghRepo: "",
    type: "",
    folderToBeDisplayedIn: "",
  });

  // const [_, __, keepExistingParams] = useParamsHelper();
  const [
    newlyCreatedFolders,
    setNewlyCreatedFolders, 
    clickedFolder, 
    setClickedFolder, 
    newFolderIndexKey
  ] = useFolderHelper(undefined);

  const newlyCreatedFoldersMemo = useMemo(() => newlyCreatedFolders, [newlyCreatedFolders])
  const setNewlyCreatedFoldersMemo = useCallback(() => setNewlyCreatedFolders, [setNewlyCreatedFolders])
  const clickedFolderMemo = useCallback(() => clickedFolder, [clickedFolder])
  const setClickedFolderMemo = useCallback(() => setClickedFolder, [setClickedFolder])
  const newFolderIndexKeyMemo= useCallback(() => newFolderIndexKey, [newFolderIndexKey])


  // useEffect(() => {
  //   console.log("newlyCreatedFoldersMemo");
  // }, [newlyCreatedFoldersMemo])
  // useEffect(() => {
  //   console.log("setNewlyCreatedFoldersMemo");
  // }, [setNewlyCreatedFoldersMemo])
  // useEffect(() => {
  //   console.log("setClickedFolderMemo");
  // }, [setClickedFolderMemo])

  useEffect(() => {
    const allAppPartsHelper = {};
    if (preExistingPartsMemo) {
      console.log("main uef in useAppPartsHelper");
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
    // keepExistingParams();
  };

  const addNewPartAndClear = () => {
    console.log("addNewPartAndClear");
    if(newPartsAdded && newPart && folderOfNewPart){
      setNewPartsAdded({
        ...newPartsAdded,
        [newPart.name]: {
          ...newPart,
          folderToBeDisplayedIn:
            folderOfNewPart.id || Object.values(folderOfNewPart)[0].id,
          // I need to create a singly function that is going to turn this and return a single item in both cases
        },
      });
      setNewlyCreatedFoldersMemo([...newlyCreatedFoldersMemo, folderOfNewPart]); //////////////////////////////////
      setNewPart({
        ...newPart,
        name: "",
        ghRepo: "",
        type: "",
      });
      setClickedFolderMemo("");
      setFolderOfNewPart("");
      // keepExistingParams();
    }
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
  
  const newlyAddedPartsMemo = useMemo(() => newPartsAdded && Object.values(newPartsAdded), [newPartsAdded])
  const newAppsUniqueFoldersKeys = useMemo(
    () =>
    !!newlyAddedPartsMemo &&
      Array.from(
        new Set(
          newlyAddedPartsMemo.map(
            (part) => part.folderToBeDisplayedIn + ""
          )
        )
      ),
    [newlyAddedPartsMemo]
  );
  
  const allUniqueFolderKeys = useMemo(
    () => !!preExistingPartsMemo &&
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