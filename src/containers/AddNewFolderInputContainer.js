import styled from "@emotion/styled";
import ButtonUnit from "./ButtonUnit";
import InputUnit from "./InputUnit";
import styleVariables from "../styleVariables";
import useParamsHelper from "../hooks/useParamsHelper";

const NewFolderInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 400px;
  background-color: #fffcfa;
`;

const ClosePopUpButton = styled.div`
  right: 0;
  display: flex;
  height: 35px;
  width: 35px;
  color: black;
  background-color: ${styleVariables.colours.primaryPink};
  box-shadow: ${styleVariables.boxShadow.smallButton};
  border-radius: ${styleVariables.borderRadious.secondary};
  margin: 6px;
`;

const XIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 35px;

  margin: auto;
  height: 100%;
`;

const AddNewFolderInputContainer = ({
  newFolderName,
  addNewFolderAndClear,
  newInputTitle,
  onClickingFolder,
  setIsNewFolderPopUpOpen,
}) => {
  return (
    <NewFolderInputContainer>
      <ClosePopUpButton onClick={() => setIsNewFolderPopUpOpen(false)}>
        <XIconContainer>X</XIconContainer>
      </ClosePopUpButton>
      <p>
        If the newly created folder is not choosen to contain the new part,
        if will be deleted
      </p>
      <label> New Folder Name: {newFolderName} </label>
      <ButtonUnit
        onClickFunction={addNewFolderAndClear}
        type="add"
        label="add"
      />
      <InputUnit
        newInputTitle={newInputTitle}
        key="newFolderInput"
        type="text"
        name="newFolder"
        value={newFolderName}
        onChangeFunction={onClickingFolder}
      />
    </NewFolderInputContainer>
  );
};

export default AddNewFolderInputContainer;
