import InputUnit from "./InputUnit";

const AddNewPartInput = ({ newPart, setNewPart }) => {
  return (
    <>
      <InputUnit
        inputTitle={`New Part Name: ${newPart.name}`}
        key="newFolderInput"
        type="text"
        name="newFolder"
        value={newPart.name}
        onChangeFunction={setNewPart}
      />
      <InputUnit
        inputTitle={`New Part Name: ${newPart.ghRepo}`}
        key="newPartGitHubRepo"
        type="text"
        name="newPartGitHubRepo"
        value={newPart.ghRepo}
        onChangeFunction={(e) =>
          setNewPart({ ...newPart, ghRepo: e.target.value })
        }
      />
      <InputUnit
        inputTitle={`New Part Name: ${newPart.type}`}
        key="newPartType"
        type="text"
        name="newPartType"
        value={newPart.type}
        onChangeFunction={(e) =>
          setNewPart({ ...newPart, type: e.target.value })
        }
      />
    </>
  );
};

export default AddNewPartInput;
