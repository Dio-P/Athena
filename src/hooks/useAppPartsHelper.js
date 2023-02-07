import { useEffect, useMemo, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import useParamsHelper from "./useParamsHelper";
import useFolderHelper from "./useFolderHelper";


const useAppPartsHelper = (preexistingParts) => {
  console.log("hi useAppPartsHelper");
  const [allAppParts, setAllAppParts] = useState([]);
  const [newPartsAdded, setNewPartsAdded] = useState("");
  const [folderOfNewPart, setFolderOfNewPart] = useState("");

  // const newPartId = useMemo(() => uuidv4(), [])

  // const [newPart, setNewPart] = useState({
  //   name: "",
  //   id: newPartId,
  //   ghRepo: "",
  //   type: "",
  //   folderToBeDisplayedIn: "",
  // });
  // console.log("newPart", newPart);

   const didMountRef = useRef(false);


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
    console.log("useAppParts uef 57");
    if (didMountRef.current && preexistingParts) { 
      setAllAppParts(preexistingParts);
    }
    didMountRef.current = true;
  }, [preexistingParts]);

  const onClickingPart = (part) => {
    console.log("on clicking part out");
    if(part){
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

  // const addNewPartAndClear = () => {
  //   console.log("addNewPartAndClear");
  //   setNewPartsAdded({
  //     ...newPartsAdded,
  //     [newPart.name]: {
  //       ...newPart,
  //       folderToBeDisplayedIn:
  //         folderOfNewPart.id || Object.values(folderOfNewPart)[0].id,
  //       // I need to create a singly function that is going to turn this and return a single item in both cases
  //     },
  //   });
  //   setNewlyCreatedFolders([...newlyCreatedFolders, folderOfNewPart]); //////////////////////////////////
  //   setNewPart({
  //     ...newPart,
  //     name: "",
  //     ghRepo: "",
  //     type: "",
  //   });
  //   setClickedFolder("");
  //   setFolderOfNewPart("");
  //   keepExistingParams();
  // };

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

  const deleteNewlyAddedPart = (part) => {
    const folderIdIsInUse = (id) => allUniqueFolderKeys.includes(id);
    delete newPartsAdded[part.name];
    setNewPartsAdded({ ...newPartsAdded });
    // delete the folders key if no app is using it
    const updatedNewFoldersFolder = newlyCreatedFolders.filter(({ id }) =>
      folderIdIsInUse(id)
    );

    setNewlyCreatedFolders(updatedNewFoldersFolder);
  };

  return {
    allAppParts, 
    newPartsAdded, 
    setNewPartsAdded, 
    // newPart, 
    // setNewPart,
    folderOfNewPart, 
    setFolderOfNewPart,
    // allUniqueFolderKeys, 
    onClickingPart, 
    // addNewPartAndClear,
    // deleteNewlyAddedPart
  };
}

export default useAppPartsHelper; 