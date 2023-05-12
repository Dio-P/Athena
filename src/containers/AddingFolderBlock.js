import { useState } from "react";
import styled from "@emotion/styled";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";
import DropDown from "../components/DropDown";
import PopUp from "../components/PopUp";
import { WarningElement } from "../components/specialElements";
import GenericButtonIcon from "../components/GenericButtonIcon";
import AddNewFolder from "../popUpComponents/AddNewFolder";

const MainAddNewFolderContainer = styled.div`
  margin-top: 4px;
  padding: 1px 2px;
  width: 100%;
  margin: 1em;
`;

const AddingFolderBodyContainer = styled.div`
  display: flex;
`;

const AddingFolderBlock = ({
  newPart,
  setNewPart,
  folderOfNewPart,
  setFolderOfNewPart,
  allPreexistingFolders,
  allNewFolders,
  folderBeenCreated,
  setFolderBeenCreated,
  isFolderWarningOn,
  folderInfoToState,
  addNewFolderAndClear

}) => {
  const {
    manageFolderDdOpenParam,
    keepExistingParams,
    params: { isFolderDdOpen },
  } = useParamsHelper();

  const {
    clickedFolder,
    setClickedFolder,
    newFolderIndexKey,
    onClickingPreExistingFolder,
  } = useFolderHelper();

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // const addNewFolderAndClear = () => {
  //   const newFolder = {
  //     name: folderBeenCreated,
  //     id: newFolderIndexKey,
  //   };
  //   setFolderOfNewPart(newFolder);
  //   setNewPart({
  //     ...newPart,
  //     folderToBeDisplayedIn: newFolderIndexKey,
  //   });

  //   setIsPopUpOpen(false);
  //   setClickedFolder(folderBeenCreated);
  //   manageFolderDdOpenParam();
  // };

  // const folderInfoToState = (folder) => {
  //   setClickedFolder(folder.name);
  //   setFolderOfNewPart(folder);
  //   setNewPart({
  //     ...newPart,
  //     folderToBeDisplayedIn: folder.id,
  //   });
  //   manageFolderDdOpenParam();
  // };

  // where was the bellow used ?

  // <ButtonUnit
  //         onClickFunction={resetFolderInfo}
  //         type="add"
  //         label={`folder name: ${folderOfNewPart.name} click to edit`}
  //       />
  const resetFolderInfo = () => {
    setFolderOfNewPart("");
    keepExistingParams();
  };

  const renderAddNewFolderPopUp = () => {
    setIsPopUpOpen(true);
  };

  return (
    <MainAddNewFolderContainer>
      <GenericButtonIcon
        onClickFunction={manageFolderDdOpenParam}
        type="dropDown"
        isMenuOpen={isFolderDdOpen}
        folderOfNewPart={folderOfNewPart}
        clickedFolder={clickedFolder}
      />
      <AddingFolderBodyContainer>
        {isFolderDdOpen && (
          <DropDown
            preexistingData={allPreexistingFolders}
            newData={allNewFolders}
            onClickFunction={folderInfoToState}
            folderOfNewPart={folderOfNewPart}
            onClickingBtnFunction={renderAddNewFolderPopUp}
            dDBtnLabel="+ Add New Folder"
          />
        )}
        {isFolderWarningOn && <WarningElement info="Please choose a folder" />}
          <PopUp
            ComponentToDisplay={AddNewFolder}
            setIsPopUpOpen={setIsPopUpOpen}
            folderOfNewPart={folderOfNewPart}
            onClickFunction={addNewFolderAndClear}
            folderBeenCreated={folderBeenCreated}
            setFolderBeenCreated={setFolderBeenCreated}
            isPopUpOpen={isPopUpOpen}
          />
      </AddingFolderBodyContainer>
    </MainAddNewFolderContainer>
  );
};

export default AddingFolderBlock;
