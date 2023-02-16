import styled from "@emotion/styled";
import ButtonUnit from "./ButtonUnit";
import InputUnit from "./InputUnit";
import styleVariables from "../styleVariables";
import { WarningElement } from "../components/specialElements";
import useParamsHelper from "../hooks/useParamsHelper";

const NewFolderInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${styleVariables.borderRadious.secondary};
  height: 310px;
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
  margin: 8px;
  align-self: end;
`;

const XIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 35px;
  margin: auto;
  height: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  
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
      <Body>
        <InputUnit
        // pass the new folder logic
          inputTitle={`New Folder Name: ${newFolderName}`}
          key="newFolderInput"
          type="text"
          name="newFolder"
          value={newFolderName}
          onChangeFunction={onClickingFolder}
        />
        <ButtonUnit
          onClickFunction={addNewFolderAndClear}
          type="add"
          label="add"
        />
        <WarningElement
          label="If the newly created folder is not choosen to contain the new part,
          it will be deleted"
        />
      </Body>
    </NewFolderInputContainer>
  );
};

export default AddNewFolderInputContainer;
