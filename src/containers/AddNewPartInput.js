import InputUnit from "./InputUnit";
import { WarningElement } from "../components/specialElements";

const AddNewPartInput = ({
  newPart,
  setNewPartName,
  setNewPartGhRepo,
  setNewPartType,
  isPartNameWarningOn,
}) => {
  return (
    <>
      <InputUnit
        inputTitle={`New Part Name: ${newPart.name}`}
        key="newFolderInput"
        type="text"
        name="newFolder"
        value={newPart.name}
        onChangeFunction={setNewPartName}
      />
      {isPartNameWarningOn && <WarningElement info="Please add a name" />}
      <InputUnit
        inputTitle={`New Part Git Hub Repo: ${newPart.ghRepo}`}
        key="newPartGitHubRepo"
        type="text"
        name="newPartGitHubRepo"
        value={newPart.ghRepo}
        onChangeFunction={setNewPartGhRepo}
      />
      <InputUnit
        inputTitle={`New Part Type: ${newPart.type}`}
        key="newPartType"
        type="text"
        name="newPartType"
        value={newPart.type}
        onChangeFunction={setNewPartType}
      />
    </>
  );
};

export default AddNewPartInput;
