import styled from "@emotion/styled";
import ButtonUnit from "./ButtonUnit";
import InputUnit from "./InputUnit";

const NewFolderInputContainer = styled.div`
height: 100%;
background-color: #fffcfa;
`;

const AddNewFolderInputContainer = ({ newFolderName, addNewFolderAndClear, newInputTitle, onClickingFolder }) => {
  return (
    <NewFolderInputContainer>
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
  )
}

export default AddNewFolderInputContainer;