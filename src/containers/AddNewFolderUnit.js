import styled from "@emotion/styled";
import ButtonUnit from "./ButtonUnit";
import InputUnit from "./InputUnit";

const NewFolderInputContainer = styled.div`
height: 100%;
background-color: #fffcfa;
`;

const AddNewFolderUnit = ({ folderName, buttonOnClickFunction, inputTitle, inputOnChangeFunction }) => {
  return (
    <NewFolderInputContainer>
      <label> New Folder Name: {folderName} </label>
        <ButtonUnit
          onClickFunction={buttonOnClickFunction}
          addingButton={true}
          buttonTitle="add"
        />
      <InputUnit
        inputTitle={inputTitle}
        key="newFolderInput"
        type="text"
        name="newFolder"
        value={folderName}
        onChangeFunction={inputOnChangeFunction}
      />
    </NewFolderInputContainer>
  )
}

export default AddNewFolderUnit;