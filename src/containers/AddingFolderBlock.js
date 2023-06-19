import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useParamsHelper from "../hooks/useParamsHelper";
import DropDown from "../components/DropDown";
import PopUp from "../components/PopUp";
import { WarningElement } from "../components/specialElements";
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
  newFolder,
  setNewPart,
  preexistingFolders,
  newlyCreatedFolders,
  // allNewFolders,
  folderBeenCreated,
  setFolderBeenCreated,
  isFolderWarningOn,
  settingNewPartFolder,
  addNewFolderAndClear,
  clickedFolder,
  setClickedFolder,
  newFolderIndexKey
}) => {
  const {
    manageAddNewFolderParam,
    params: { isDdOpen, addingNewFolder },
  } = useParamsHelper();

  console.log("preexistingFolders$", preexistingFolders);
  console.log("newlyCreatedFolders$", newlyCreatedFolders);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const onClickPlusClosePopup = () => {
    addNewFolderAndClear();
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: newFolderIndexKey,
    });
    // setIsPopUpOpen(false);
    manageAddNewFolderParam();
    setClickedFolder(folderBeenCreated);
  };

  useEffect(() => {
    if(clickedFolder) {

      console.log("clickedFolder@@@", clickedFolder);
    }
 
  }, [clickedFolder])

  return (
    <MainAddNewFolderContainer>
      {/* <GenericButtonIcon
        onClickFunction={manageDdOpenParam}
        type="dropDown"
        isMenuOpen={isDdOpen}
        newFolder={newFolder}
        clickedFolder={clickedFolder}
      /> */}
      <AddingFolderBodyContainer>
          <DropDown
            preexistingData={preexistingFolders}
            newData={newlyCreatedFolders}
            freshlyAddedValue={newFolder}
            onClickingAdditionalOption={manageAddNewFolderParam}
            dDBtnLabel="+ Add New Folder"
            isDropdownOpen={isDdOpen}
            chosenValue={clickedFolder}
            onClickOption={settingNewPartFolder}
            providingAdditionalOption={true}
          />
        {isFolderWarningOn && <WarningElement info="Please choose a folder" />}
        <PopUp
          ComponentToDisplay={AddNewFolder}
          isPopUpOpen={addingNewFolder}
          setIsPopUpOpen={manageAddNewFolderParam}
          newFolder={newFolder}
          onClickFunction={onClickPlusClosePopup}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
        />
      </AddingFolderBodyContainer>
    </MainAddNewFolderContainer>
  );
};

export default AddingFolderBlock;
