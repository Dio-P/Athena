import styled from "@emotion/styled";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";
import { arrowDownIcon, arrowUpIcon } from "../helpers/svgIcons";
import { useState } from "react";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import DropDown from "../components/DropDown";
import NewFolderPopUp from "../components/NewFolderPopUp";
import styleVariables from "../styleVariables";
import { WarningElement } from "../components/specialElements";
import GenericButtonIcon from "../components/GenericButtonIcon";

const MainAddNewFolderContainer = styled.div`
  margin-top: 4px;
  padding: 1px 2px;
  width: 100%;
  margin: 1em;
`;

// const FolderButtonContainerWrapper = styled.div`
//   display: flex;
//   border: solid black;
//   align-content: center;
//   width: 300px;
//   height: 35px;
//   align-items: center;
//   border-radius: ${styleVariables.borderRadious.secondary};
// `;

// const FolderButtonContainer = styled.div`
//   display: flex;
//   width: 100%;
//   align-items: center;
// `;

const AddingFolderBodyContainer = styled.div`
  display: flex;
`;

// const ArrowContainer = styled.div`
//   height: 20px;
//   width: 20px;
// `;


const AddingFolderBlock = ({
  newPart,
  setNewPart,
  folderOfNewPart,
  setFolderOfNewPart,
  allPreexistingFolders,
  allNewFolders,
  folderBeenCreated,
  setFolderBeenCreated,
  isFolderWarningOn
}) => {
  const { manageFolderDdOpenParam, keepExistingParams, params:{
    isFolderDdOpen
  } } = useParamsHelper();

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

  // const dropDownToogleButtonTitle = folderOfNewPart
  //   ? `Folder to display new part in: ${capitaliseFirstLetters(
  //     clickedFolder
  //     )}`
  //   : "Choose a folder to display part in";

  return (
    <MainAddNewFolderContainer>
      <GenericButtonIcon onClickFunction={manageFolderDdOpenParam} type="dropDown" isMenuOpen={isFolderDdOpen}/>
      {/* <FolderButtonContainerWrapper>
        <FolderButtonContainer onClick={manageFolderDdOpenParam}>
          <div> {dropDownToogleButtonTitle} </div>
          <ArrowContainer>{folderDdOpen ? arrowUpIcon : arrowDownIcon}</ArrowContainer>
        </FolderButtonContainer>
      </FolderButtonContainerWrapper> */}
      <AddingFolderBodyContainer>
        {isFolderDdOpen && (
          <DropDown
          preexistingData={allPreexistingFolders}
          newData={allNewFolders}
          onClickFunction={folderInfoToState}
          folderOfNewPart={folderOfNewPart}
          onClickingBtnFunction={renderAddNewFolderPopUp}
          dDBtnLabel="+ Add New Folder"
          // folderBeenCreated={folderBeenCreated}
        />
        )}
        {isFolderWarningOn && <WarningElement info="Please choose a folder"/>}
        {isNewFolderPopUpOpen
        &&
        <NewFolderPopUp
          setIsNewFolderPopUpOpen={setIsNewFolderPopUpOpen}
          folderOfNewPart={folderOfNewPart}
          onClickFunction={addNewFolderAndClear}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
        />
        }
      </AddingFolderBodyContainer>
    </MainAddNewFolderContainer>
  );
};

export default AddingFolderBlock;
