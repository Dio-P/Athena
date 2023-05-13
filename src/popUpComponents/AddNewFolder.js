import styled from "@emotion/styled";
import InputUnit from "../containers/InputUnit";
import styleVariables from "../styleVariables";
import { WarningElement } from "../components/specialElements";
import { deleteIcon } from "../helpers/svgIcons";
import useParamsHelper from "../hooks/useParamsHelper";
import GenericButtonIcon from "../components/GenericButtonIcon";
import useFolderHelper from "../hooks/useFolderHelper";

const AddNewFolderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${styleVariables.borderRadious.secondary};
  height: 310px;
  width: 400px;
  background-color: #fffcfa;
`;


// const SmallButton = styleVariables.customStyledElements.SmallButton;

// const ClosePopUpButton = styled.div`
//   right: 0;
//   display: flex;
//   height: 35px;
//   width: 35px;
//   color: black;
//   background-color: ${styleVariables.colours.primaryPink};
//   box-shadow: ${styleVariables.boxShadow.smallButton};
//   border-radius: ${styleVariables.borderRadious.secondary};
//   margin: 8px;
//   align-self: end;
// `;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const AddNewFolder = ({
  newFolderName,
  addNewFolderAndClear,
  newInputTitle,
  onClickingFolder,
  setIsPopUpOpen,
  newFolder,
  onClickFunction,
  folderBeenCreated,
  setFolderBeenCreated,
}) => {

  const { setClickedFolder } = useFolderHelper();

  const onAddingNewFolder = () => {
    
  }

  return (
    <AddNewFolderContainer>
      {/* <GenericButtonIcon
        onClickFunction={() => setIsPopUpOpen(false)}
        type="small"
        icon={deleteIcon}
      /> */}
      <Body>
        <InputUnit
          // pass the new folder logic
          inputTitle={`New Folder Name: ${folderBeenCreated}`}
          key="newFolderInput"
          type="text"
          name="newFolder"
          value={folderBeenCreated}
          onChangeFunction={setFolderBeenCreated}
        />
        <GenericButtonIcon
          onClickFunction={onClickFunction}
          type="add"
          label="add"
        />
        <WarningElement
          info="If the newly created folder is not choosen to contain the new part,
          it will be deleted"
        />
      </Body>
    </AddNewFolderContainer>
  );
};

export default AddNewFolder;
