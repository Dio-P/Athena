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
  folderOfNewPart,
  setNewPart,
  preexistingFolders,
  newlyCreatedFolders,
  // allNewFolders,
  folderBeenCreated,
  setFolderBeenCreated,
  isFolderWarningOn,
  folderInfoToState,
  addNewFolderAndClear,
}) => {
  const {
    manageFolderDdOpenParam,
    params: { isFolderDdOpen },
  } = useParamsHelper();

  console.log("preexistingFolders$", preexistingFolders);
  console.log("newlyCreatedFolders$", newlyCreatedFolders);

  const { clickedFolder, setClickedFolder, newFolderIndexKey } = useFolderHelper(preexistingFolders, newlyCreatedFolders);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const onClickPlusClosePopup = () => {
    addNewFolderAndClear();
    console.log("newPart and folderToBeDisplayedIn", {
      ...newPart,
      folderToBeDisplayedIn: newFolderIndexKey,
    });
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: newFolderIndexKey,
    });
    setIsPopUpOpen(false);

    setClickedFolder(folderBeenCreated);
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
            preexistingData={preexistingFolders}
            newData={newlyCreatedFolders}
            onClickFunction={folderInfoToState}
            newFolder={folderOfNewPart}
            onClickingBtnFunction={() => setIsPopUpOpen(true)}
            dDBtnLabel="+ Add New Folder"
          />
        )}
        {isFolderWarningOn && <WarningElement info="Please choose a folder" />}
        <PopUp
          ComponentToDisplay={AddNewFolder}
          setIsPopUpOpen={setIsPopUpOpen}
          folderOfNewPart={folderOfNewPart}
          onClickFunction={onClickPlusClosePopup}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
          isPopUpOpen={isPopUpOpen}
        />
      </AddingFolderBodyContainer>
    </MainAddNewFolderContainer>
  );
};

export default AddingFolderBlock;
