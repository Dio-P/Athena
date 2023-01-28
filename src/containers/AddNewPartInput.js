import InputUnit from "./InputUnit";

const AddNewPartInput = ({ newPart, setNewPartName, setNewPartGhRepo, setNewPartType }) => {
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
      <InputUnit
        inputTitle={`New Part Name: ${newPart.ghRepo}`}
        key="newPartGitHubRepo"
        type="text"
        name="newPartGitHubRepo"
        value={newPart.ghRepo}
        onChangeFunction={setNewPartGhRepo}
      />
      <InputUnit
        inputTitle={`New Part Name: ${newPart.type}`}
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
