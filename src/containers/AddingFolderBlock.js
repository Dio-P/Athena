import { useState } from "react";
import styled from "@emotion/styled";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";
import DropDown from "../components/DropDown";
import NewFolderPopUp from "../components/NewFolderPopUp";
import { WarningElement } from "../components/specialElements";
import GenericButtonIcon from "../components/GenericButtonIcon";

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

  const [isNewFolderPopUpOpen, setIsNewFolderPopUpOpen] = useState(false);

  const addNewFolderAndClear = () => {
    const newFolder = {
      name: folderBeenCreated,
      id: newFolderIndexKey,
    };
    setFolderOfNewPart(newFolder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: newFolderIndexKey,
    });

    setIsNewFolderPopUpOpen(false);
    setClickedFolder(folderBeenCreated);
    manageFolderDdOpenParam();
  };

  const folderInfoToState = (folder) => {
    console.log("folderInfoToState@@@, folder is: ", folder);
    setClickedFolder(folder.name);
    setFolderOfNewPart(folder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: folder.id,
    });
    manageFolderDdOpenParam();
  };

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
    console.log("setIsNewFolderPopUpOpen to be set to true");
    setIsNewFolderPopUpOpen(true);
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
        {isNewFolderPopUpOpen && (
          <NewFolderPopUp
            setIsNewFolderPopUpOpen={setIsNewFolderPopUpOpen}
            folderOfNewPart={folderOfNewPart}
            onClickFunction={addNewFolderAndClear}
            folderBeenCreated={folderBeenCreated}
            setFolderBeenCreated={setFolderBeenCreated}
          />
        )}
      </AddingFolderBodyContainer>
    </MainAddNewFolderContainer>
  );
};

export default AddingFolderBlock;
