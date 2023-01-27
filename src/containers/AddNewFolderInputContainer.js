import styled from "@emotion/styled";
import ButtonUnit from "./ButtonUnit";
import InputUnit from "./InputUnit";

const NewFolderInputContainer = styled.div`
height: 100%;
background-color: #fffcfa;
`;

const AddNewFolderInputContainer = ({ newFolderName, addNewFolderAndClear, inputTitle, inputOnChangeFunction }) => {
  return (
    <NewFolderInputContainer>
      <label> New Folder Name: {newFolderName} </label>
        <ButtonUnit
          onClickFunction={addNewFolderAndClear}
          addingButton={true}
          buttonTitle="add"
        />
      <InputUnit
        inputTitle={inputTitle}
        key="newFolderInput"
        type="text"
        name="newFolder"
        value={newFolderName}
        onChangeFunction={inputOnChangeFunction}
      />
    </NewFolderInputContainer>
  )
}

export default AddNewFolderInputContainer;