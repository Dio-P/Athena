import { useEffect, useMemo, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import useParamsHelper from "./useParamsHelper";
import useFolderHelper from "./useFolderHelper";


const useAppPartsHelper = (preexistingParts) => {
  console.log("hi useAppPartsHelper");
  // const [allAppParts, setAllAppParts] = useState([]);
  // const [newPartsAdded, setNewPartsAdded] = useState("");
  // const [folderOfNewPart, setFolderOfNewPart] = useState("");
  let folderOfNewPartRef = useRef()
  const hi = "hello"

  // const newPartId = useMemo(() => uuidv4(), [])

  // const [newPart, setNewPart] = useState({
  //   name: "",
  //   id: newPartId,
  //   ghRepo: "",
  //   type: "",
  //   folderToBeDisplayedIn: "",
  // });
  // console.log("newPart", newPart);
  // useEffect(() => {
  //   console.log("folderOfNewPart@", folderOfNewPart);
  //   folderOfNewPartRef.current = folderOfNewPart
  //   console.log("folderOfNewPartRef.current", folderOfNewPartRef.current);
  // }, [folderOfNewPart])
  

  const updateFolderOfNewPart = (folder) => {
    console.log("hi");
    // folderOfNewPartRef.current = folder
  }

   const didMountRef = useRef(false);


  // const { keepExistingParams } = useParamsHelper();
  // const {
  //   newlyCreatedFolders,
  //   setNewlyCreatedFolders, 
  //   // clickedFolder, 
  //   setClickedFolder, 
  //   // newFolderIndexKey
  // } = useFolderHelper();

  // useEffect(() => {
  //   console.log("useAppPartHelper"); 
  // }, []);

  // useEffect(() => {
  //   console.log("useAppParts uef 57");
  //   if (didMountRef.current && preexistingParts) { 
  //     setAllAppParts(preexistingParts);
  //   }
  //   didMountRef.current = true;
  // }, [preexistingParts]);

  // const onClickingPart = (part) => {
  //   console.log("on clicking part out");
  //   if(part){
  //     setAllAppParts({
  //       ...allAppParts,
  //       [part.name]: {
  //         ...allAppParts[part.name],
  //         clicked: !part.clicked,
  //       },
  //     });
  //   }
  //   keepExistingParams();
  // };
  

  // const addNewPartAndClear = () => {
  //   keepExistingParams();
  //   console.log("addNewPartAndClear");
  //   console.log("folderOfNewPart", folderOfNewPart);
  //   console.log("folderOfNewPart.id", folderOfNewPart.id);
  //   console.log("folderOfNewPartRef.current", folderOfNewPartRef.current);

  //   console.log("Object.values(folderOfNewPart)[0].id", Object.values(folderOfNewPart)[0].id);

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
  // };

  // const existingAppsUniqueFolderKeys = useMemo(
  //   () =>
  //   !!preexistingParts &&
  //     Array.from(
  //       new Set(
  //         Object.values(preexistingParts).map(
  //           (part) => part.folderToBeDisplayedIn
  //         )
  //       )
  //     ),
  //   [preexistingParts]
  // );
  
  // const newAppsUniqueFoldersKeys = useMemo(
  //   () =>
  //     Array.from(
  //       new Set(
  //         Object.values(newPartsAdded).map(
  //           (part) => part.folderToBeDisplayedIn + ""
  //         )
  //       )
  //     ),
  //   [newPartsAdded]
  // );
  
  // const allUniqueFolderKeys = useMemo(
  //   () => !!preexistingParts &&
  //   [...newAppsUniqueFoldersKeys, ...existingAppsUniqueFolderKeys],
  //   [newAppsUniqueFoldersKeys, existingAppsUniqueFolderKeys]
  // );

  // const deleteNewlyAddedPart = (part) => {
  //   const folderIdIsInUse = (id) => allUniqueFolderKeys.includes(id);
  //   delete newPartsAdded[part.name];
  //   setNewPartsAdded({ ...newPartsAdded });
  //   // delete the folders key if no app is using it
  //   const updatedNewFoldersFolder = newlyCreatedFolders.filter(({ id }) =>
  //     folderIdIsInUse(id)
  //   );

  //   setNewlyCreatedFolders(updatedNewFoldersFolder);
  // };

  // const resetFolderInfo = () => {
  //   setFolderOfNewPart("");
  //   keepExistingParams();
  // };

  // return {
  //   hi,
  //   folderOfNewPartRef,
  //   updateFolderOfNewPart,
  //   // allAppParts, 
  //   // newPartsAdded, 
  //   // setNewPartsAdded, 
  //   // newPart, 
  //   // setNewPart,
  //   // folderOfNewPart, 
  //   // setFolderOfNewPart,
  //   // allUniqueFolderKeys, 
  //   // onClickingPart,
  //   // resetFolderInfo,
  //   // addNewPartAndClear,
  //   // deleteNewlyAddedPart
  // };
}

export default useAppPartsHelper; 