import styled from "@emotion/styled";
import AddNewPartInput from "./AddNewPartInput";
import AddingFolderBlock from "./AddingFolderBlock";
import ButtonUnit from "./ButtonUnit";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";

const DisplayBox = styled.div`
  margin: 10px;
  position: relevant;
  border: solid black;
  border-radius: 15px;
  background-color: #fffcfa;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  z-index: 1;
  width: 90%;
  height: 100%;
`;

const TitleButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 12px;
`;

const AddingPartBlock = ({
  newPartsAdded,
  setNewPartsAdded,
  newPart,
  setNewPart,
  folderOfNewPart,
  setFolderOfNewPart,
  // folderDdOpen,
  allPreexistingFolders,
  newFoldersToBeAddedToAll,
  clickedFolder,
  // manageFolderDdOpenParam,
}) => {
  const { keepExistingParams } = useParamsHelper();

  const { newlyCreatedFolders, setNewlyCreatedFolders, setClickedFolder } =
    useFolderHelper();

  const addNewPartAndClear = () => {
    setNewPartsAdded({
      ...newPartsAdded,
      [newPart.name]: {
        ...newPart,
        folderToBeDisplayedIn:
          folderOfNewPart.id || Object.values(folderOfNewPart)[0].id,
        // the above right now returns undefined
      },
    });
    setNewlyCreatedFolders([...newlyCreatedFolders, folderOfNewPart]); //////////////////////////////////
    setNewPart({
      ...newPart,
      name: "",
      ghRepo: "",
      type: "",
    });
    setClickedFolder("");
    setFolderOfNewPart("");
    keepExistingParams();
  };

  const resetFolderInfo = () => {
    setFolderOfNewPart("");
    keepExistingParams();
  };

  return (
    <DisplayBox>
      <TitleButtonWrapper>
        <h3>New Part</h3>
      </TitleButtonWrapper>
      <AddNewPartInput
        newPart={newPart}
        setNewPartName={(input) => setNewPart({ ...newPart, name: input })}
        setNewPartGhRepo={(input) => setNewPart({ ...newPart, ghRepo: input })}
        setNewPartType={(input) => setNewPart({ ...newPart, type: input })}
      />
      <AddingFolderBlock
        newPart={newPart}
        setNewPart={setNewPart}
        folderOfNewPart={folderOfNewPart}
        setFolderOfNewPart={setFolderOfNewPart}
        // folderDdOpen={folderDdOpen}
        allPreexistingFolders={allPreexistingFolders}
        allNewFolders={newFoldersToBeAddedToAll}
        newclickedFolder={clickedFolder}
        newInputTitle={`New Part Name: ${newPart.type}`}
        resetFolderInfo={resetFolderInfo}
        // manageFolderDdOpenParam={manageFolderDdOpenParam}
      />
      <ButtonUnit
        onClickFunction={addNewPartAndClear}
        type="add"
        label="add this part and start with another"
      />
    </DisplayBox>
  );
};

export default AddingPartBlock;
