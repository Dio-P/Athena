import styled from "@emotion/styled";
import AllFolders from "./AllFolders";
import ButtonUnit from "./ButtonUnit";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";
import { arrowDown, arrowUp } from "../helpers/svgIcons";
import { useState } from "react";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

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
  // addingNewFolder,
  allPreexistingFolders,
  allNewFolders,
  newFolderName,
  newInputTitle,
  onClickingFolder,
  // clickingToAddNewFolder,
}) => {
  const { clickingToAddNewFolder, keepExistingParams, params:{
    addingNewFolder
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
    clickingToAddNewFolder();
  };

  // where was the bellow used ?
  const resetFolderInfo = () => {
    setFolderOfNewPart("");
    keepExistingParams();
  };

  const dropDownToogleButtonTitle = folderOfNewPart
    ? `Folder to display new part in: ${capitaliseFirstLetters(
        folderOfNewPart.name
      )}`
    : "Choose a folder to display part in";

  return (
    <MainAddNewFolderContainer>
      <FolderButtonContainer onClick={clickingToAddNewFolder}>
        {dropDownToogleButtonTitle}
        <ArrowContainer>{addingNewFolder ? arrowUp : arrowDown}</ArrowContainer>
      </FolderButtonContainer>
      {addingNewFolder && (
        <AllFolders
          addingNewFolder={addingNewFolder}
          allPreexistingFolders={allPreexistingFolders}
          allNewFolders={allNewFolders}
          folderInfoToState={(value) => folderInfoToState(value)}
          newFolderName={newFolderName}
          addNewFolderAndClear={addNewFolderAndClear}
          newInputTitle={newInputTitle}
          onClickingFolder={(value) => onClickingPreExistingFolder(value)}
          // clickingToAddNewFolder={clickingToAddNewFolder}
          folderOfNewPart={folderOfNewPart}
        />
      )}
      {/* {folderOfNewPart && (
        <ButtonUnit
          onClickFunction={resetFolderInfo}
          type="add"
          label={`folder name: ${folderOfNewPart.name} click to edit`}
        />
      )} */}
      {/* {!folderOfNewPart && (
        <ButtonUnit
          onClickFunction={clickingToAddNewFolder}
          type="add"
          label={
            addingNewFolder
              ? "- Back to Existing Folders"
              : "+ Add New Folder"
          }
        />
      )} */}
    </MainAddNewFolderContainer>
  );
};

export default AddingFolderBlock;
