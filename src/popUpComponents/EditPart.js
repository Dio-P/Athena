import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import DropDown from "../components/DropDown";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import PopUp from "../components/PopUp";
import AddNewFolder from "./AddNewFolder";
import useParamsHelper from "../hooks/useParamsHelper";

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
  secondaryFunction,
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

  const [partName, setPartName] = useState(part.name);
  const [partType, setPartType] = useState(part.type);
  const [partGhRepo, setPartGhRepo] = useState(part.ghRepo);
  const [partFolderToBeDisplayedIn, setFolderToBeDisplayedIn] = useState(
    part.folderToBeDisplayedIn
  );
  const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  console.log("part", part);
  // console.log("folders!@#", folders);

  useEffect(() => {
    console.log("partName", partName);
  }, [partName]);

  const onClickPlusClosePopup = () => {
    onClickFunction();
    setIsPopUpOpen(false);
  };
  return (
    <EditPartContainer>
      <LabelInputPair>
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={partName}
          onChange={(e) => setPartName(e.target.value)}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Type</label>
        <input
          type="text"
          value={partType}
          onChange={(e) => setPartType(e.target.value)}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Gh Repo</label>
        <input
          type="text"
          value={partGhRepo}
          onChange={(e) => setPartGhRepo(e.target.value)}
        />
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Folder</label>
        {/* change the one bellow to the right button when made */}
        <button onClick={() => manageFolderDdOpenParam()}>
          {/* is there a case where the name will not be in the preexisting folders? */}
          {capitaliseFirstLetters(preexistingFolders[partFolderToBeDisplayedIn].name)}
        </button>
        {isFolderDdOpen && (
          <DropDown
            preexistingData={preexistingFolders}
            dDBtnLabel="+ Add New Folder"
            onClickFunction={secondaryFunction}//////!!!!!!!!
            onClickingBtnFunction={() => setIsPopUpOpen(!isPopUpOpen)}
            newFolder={newFolder}
          />
        )}
        <PopUp
          ComponentToDisplay={AddNewFolder}
          setIsPopUpOpen={setIsPopUpOpen}
          newFolder={newFolder}
          onClickFunction={onClickPlusClosePopup}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
          isPopUpOpen={isPopUpOpen}
        />
      </LabelInputPair>
    </EditPartContainer>
  );
};

export default EditPart;
