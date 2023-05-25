import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import DropDown from "../components/DropDown";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import PopUp from "../components/PopUp";
import AddNewFolder from "./AddNewFolder";
import useParamsHelper from "../hooks/useParamsHelper";
import GenericButtonIcon from "../components/GenericButtonIcon";
import usePartByIdUpdate from "../hooks/queries/usePartByIdUpdate";

const EditPartContainer = styled.div`
  height: 100%;
  width: 260px;
  color: black;
`;

const LabelInputPair = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 20px ;
  & label {
    margin-bottom: 5px;
  }
}`;

const EditPart = ({
  setIsPopUpOpen,
  secondaryFunction,
  tertiaryFunction, //updateApp
  part,
  // folders,
  newFolder,
  onClickFunction,
  folderBeenCreated,
  setFolderBeenCreated,
  preexistingFolders,
  newlyCreatedFolders,
  setNewFolder,
  editedPart,
  setEditedPart,
  editPartData, 
  editPartLoading, 
  editPartError,
  editPartAndClose
}) => {

  const {
    manageFolderDdOpenParam,
    params: { isFolderDdOpen },
  } = useParamsHelper();

  
  // const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);

  const [isAddFolderPopUpOpen, setAddFolderIsPopUpOpen] = useState(false);

  useEffect(() => {
    if(editPartError){
      console.log("editPartError", editPartError);
    }
    if(editPartLoading){
      console.log("editPartLoading", editPartLoading);
    }
    if(editPartData){
      console.log("editPartData", editPartData);
    }
  }, [editPartData, editPartLoading, editPartError]);

  const onClickPlusClosePopup = () => {
    onClickFunction();
    setAddFolderIsPopUpOpen(false);
  };

  const updateFolderAndClose = (folder) => {
    secondaryFunction(folder, part);
    setFolderToBeDisplayedIn();
  };

  // const updatePartAndClose = () => {
  //   console.log("editedPart", editedPart);
  //   setEditPartWasClicked(true);
  //   // setIsPopUpOpen(false);
  // }

  return (
    <EditPartContainer>
      <LabelInputPair>
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={editedPart.name}
          onChange={(e) => setEditedPart({...editedPart, name: e.target.value})}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Type</label>
        <input
          type="text"
          value={editedPart.type}
          onChange={(e) => setEditedPart({...editedPart, type: e.target.value})}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Gh Repo</label>
        <input
          type="text"
          value={editedPart.ghRepo}
          onChange={(e) => setEditedPart({...editedPart, ghRepo: e.target.value})}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Folder</label>
        {/* change the one bellow to the right button when made */}
        <button onClick={() => manageFolderDdOpenParam()}>
          {/* is there a case where the name will not be in the preexisting folders? */}
          {capitaliseFirstLetters(preexistingFolders[editedPart.folderToBeDisplayedIn].name)}
        </button>
        {isFolderDdOpen && (
          <DropDown
            preexistingeditPartData={preexistingFolders}
            dDBtnLabel="+ Add New Folder"
            onClickFunction={updateFolderAndClose}//////!!!!!!!!
            onClickingBtnFunction={() => setAddFolderIsPopUpOpen(!isAddFolderPopUpOpen)}
            newFolder={newFolder}
          />
        )}
      </LabelInputPair>
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
