import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import DropDown from "../components/DropDown";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import PopUp from "../components/PopUp";
import AddNewFolder from "./AddNewFolder";
import useParamsHelper from "../hooks/useParamsHelper";
import GenericButtonIcon from "../components/GenericButtonIcon";
import usePartByIdUpdate from "../hooks/queries/usePartByIdUpdate";
import styleVariables from "../styleVariables";

const EditPartContainer = styled.div`
  height: 100%;
  width: 260px;
  color: black;
`;

const EditPart = ({
  setIsPopUpOpen,
  secondaryFunction,
  tertiaryFunction,
  part,
  folders,
  newFolder,
  onClickFunction,
  folderBeenCreated,
  setFolderBeenCreated,
  preexistingFolders,
  newlyCreatedFolders,
  setNewFolder,
  editedPart,
  setEditedPart,
  editPartMutation,
  // editPartData, 
  // editPartLoading, 
  // editPartError,
  editPartAndClose
}) => {

  const {
    manageFolderDdOpenParam,
    params: { isDdOpen },
  } = useParamsHelper();

  
  // const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);

  const [isAddFolderPopUpOpen, setAddFolderIsPopUpOpen] = useState(false);

  useEffect(() => {
    if(editPartMutation.error){
      console.log("editPartMutation.error", editPartMutation.error);
    }
    if(editPartMutation.loading){
      console.log("editPartMutation.loading", editPartMutation.loading);
    }
    if(editPartMutation.data){
      console.log("editPartMutation.data", editPartMutation.data);
    }
  }, [editPartMutation.data, editPartMutation.loading, editPartMutation.error]);

  const onClickPlusClosePopup = () => {
    onClickFunction();
    setAddFolderIsPopUpOpen(false);
  };

  const updateFolderAndClose = (folder) => {
    secondaryFunction(folder, part);
    // setFolderToBeDisplayedIn();
  };

  // const updatePartAndClose = () => {
  //   console.log("editedPart", editedPart);
  //   setEditPartWasClicked(true);
  //   // setIsPopUpOpen(false);
  // }

  return (
    <EditPartContainer>
      <styleVariables.popupElements.LabelInputPair>
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={editedPart.name}
          onChange={(e) => setEditedPart({...editedPart, name: e.target.value})}
        />
      </styleVariables.popupElements.LabelInputPair>
      <styleVariables.popupElements.LabelInputPair>
        <label htmlFor="">Type</label>
        <input
          type="text"
          value={editedPart.type}
          onChange={(e) => setEditedPart({...editedPart, type: e.target.value})}
        />
      </styleVariables.popupElements.LabelInputPair>
      <styleVariables.popupElements.LabelInputPair>
        <label htmlFor="">Gh Repo</label>
        <input
          type="text"
          value={editedPart.ghRepo}
          onChange={(e) => setEditedPart({...editedPart, ghRepo: e.target.value})}
        />
      </styleVariables.popupElements.LabelInputPair>
      <styleVariables.popupElements.LabelInputPair>
        <label htmlFor="">Folder</label>
        {/* change the one bellow to the right button when made */}
        {/* <button onClick={() => manageFolderDdOpenParam()}> */}
          {/* is there a case where the name will not be in the preexisting folders? */}
          {/* {capitaliseFirstLetters(preexistingFolders[editedPart.folderToBeDisplayedIn].name)} */}
        {/* </button> */}
        {/* {isDdOpen && ( */}
          <DropDown
            preexistingData={preexistingFolders}
            dDBtnLabel="+ Add New Folder"
            chosenValue={preexistingFolders[editedPart.folderToBeDisplayedIn].name}
            updateChosenValue={updateFolderAndClose}
            onClickingAdditionalOption={() => setAddFolderIsPopUpOpen(!isAddFolderPopUpOpen)}
            freshlyAddedValue={newFolder}
            isDropdownOpen={isDdOpen}
          />
        {/* )} */}
      </styleVariables.popupElements.LabelInputPair>
        <PopUp
          ComponentToDisplay={AddNewFolder}
          setIsPopUpOpen={setIsPopUpOpen}
          newFolder={newFolder}
          onClickFunction={onClickPlusClosePopup}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
          isPopUpOpen={isAddFolderPopUpOpen}
        />
      <GenericButtonIcon
        label="Edit Part"
        type="add"
        onClickFunction={editPartAndClose}
      />
    </EditPartContainer>
  );
};

export default EditPart;
