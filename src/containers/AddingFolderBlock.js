import styled from "@emotion/styled";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";
import { arrowDown, arrowUp } from "../helpers/svgIcons";
import { useState } from "react";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import DropDown from "../components/DropDown";

const MainAddNewFolderContainer = styled.div`
  text-align: center;
  margin-top: 4px;
  border: solid black;
  border-radius: 10px;
  padding: 1px 2px;
  width: 95%;
  min-height: 20px;
  margin: 1em;
`;

const FolderButtonContainer = styled.div`
  display: flex;
`;

const ArrowContainer = styled.div`
  height: 20px;
  width: 20px;
`;

const AddingFolderBlock = ({
  newPart,
  setNewPart,
  folderOfNewPart,
  setFolderOfNewPart,
  allPreexistingFolders,
  allNewFolders,
}) => {
  const { manageFolderDdOpenParam, keepExistingParams, params:{
    folderDdOpen
  } } = useParamsHelper();

  const {
    clickedFolder,
    setClickedFolder,
    newFolderIndexKey,
    onClickingPreExistingFolder,
  } = useFolderHelper();

  const [isDropDownOpen, setIsDropDownOpen] = useState(true);

  const addNewFolderAndClear = () => {
    const newFolder = {
      name: clickedFolder,
      id: newFolderIndexKey,
    };
    setFolderOfNewPart(newFolder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: newFolderIndexKey,
    });

    keepExistingParams();
  };

  const folderInfoToState = (folder) => {
    setClickedFolder(folder.name);
    setFolderOfNewPart(folder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: folder.id,
    });
    manageFolderDdOpenParam();
  };

  // where was the bellow used ?
  const resetFolderInfo = () => {
    setFolderOfNewPart("");
    keepExistingParams();
  };

  const renderAddNewFolderPopUp = () => {

  };

  const dropDownToogleButtonTitle = folderOfNewPart
    ? `Folder to display new part in: ${capitaliseFirstLetters(
        folderOfNewPart.name
      )}`
    : "Choose a folder to display part in";

  return (
    <MainAddNewFolderContainer>
      <FolderButtonContainer onClick={manageFolderDdOpenParam}>
        {dropDownToogleButtonTitle}
        <ArrowContainer>{folderDdOpen ? arrowUp : arrowDown}</ArrowContainer>
      </FolderButtonContainer>
      {folderDdOpen && (
        <DropDown
        preexistingData={allPreexistingFolders}
        newData={allNewFolders}
        onClickFunction={folderInfoToState}
        folderOfNewPart={folderOfNewPart}
        onClickingBtnFunction={renderAddNewFolderPopUp}
        dDBtnLabel="+ Add New Folder"
      />
      )}

    </MainAddNewFolderContainer>
  );
};

export default AddingFolderBlock;
