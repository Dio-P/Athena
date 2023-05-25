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
}) => {

  const {
    manageFolderDdOpenParam,
    params: { isFolderDdOpen },
  } = useParamsHelper();

  const [updatedPart, setUpdatedPart] = useState({
    name: part.name,
    id: part.id,
    ghRepo: part.ghRepo,
    type: part.type,
    folderToBeDisplayedIn: part.folderToBeDisplayedIn,
    // appParent:, 
    // do I need to add the docs?
  })
  // const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);

  const [isAddFolderPopUpOpen, setAddFolderIsPopUpOpen] = useState(false);

  const [updateWasClicked, setUpdatedWasClicked] = useState(false);
  const [data, loading, error] = usePartByIdUpdate(part.id, updatedPart , updateWasClicked);

  useEffect(() => {
    if(error){
      console.log("error", error);
    }
    if(loading){
      console.log("loading", loading);
    }
    if(data){
      console.log("data", data);
    }
  }, [data, loading, error]);

  const onClickPlusClosePopup = () => {
    onClickFunction();
    setAddFolderIsPopUpOpen(false);
  };

  const updateFolderAndClose = (folder) => {
    secondaryFunction(folder, part);
    setFolderToBeDisplayedIn();
  };

  const updatePartAndClose = () => {
    console.log("updatedPart", updatedPart);
    setUpdatedWasClicked(true);
    // setIsPopUpOpen(false);
  }

  return (
    <EditPartContainer>
      <LabelInputPair>
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={updatedPart.name}
          onChange={(e) => setUpdatedPart({...updatedPart, name: e.target.value})}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Type</label>
        <input
          type="text"
          value={updatedPart.type}
          onChange={(e) => setUpdatedPart({...updatedPart, type: e.target.value})}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Gh Repo</label>
        <input
          type="text"
          value={updatedPart.ghRepo}
          onChange={(e) => setUpdatedPart({...updatedPart, ghRepo: e.target.value})}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Folder</label>
        {/* change the one bellow to the right button when made */}
        <button onClick={() => manageFolderDdOpenParam()}>
          {/* is there a case where the name will not be in the preexisting folders? */}
          {capitaliseFirstLetters(preexistingFolders[updatedPart.folderToBeDisplayedIn].name)}
        </button>
        {isFolderDdOpen && (
          <DropDown
            preexistingData={preexistingFolders}
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
        label="Update"
        type="add"
        onClickFunction={updatePartAndClose}
      />
    </EditPartContainer>
  );
};

export default EditPart;
