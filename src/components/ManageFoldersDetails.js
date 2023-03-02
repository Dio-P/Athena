import styled from "@emotion/styled";
import { useState, useEffect, useMemo } from "react";
import styleVariables from "../styleVariables";

const FolderInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fffcfa;
  border-radius: ${styleVariables.borderRadious.secondary};
`;

const FolderContainer = styled.div`
  flex-flow: row wrap;
`;

const constructUpdatedFoldersArray = (folders, updatedFolder) => {
  const initialFolder = folders.find(folder => (folder.id === updatedFolder.id));
  const foldersWithoutChangingOne = folders.filter(
    (folder) => folder.id !== updatedFolder.id
  );
  const folderName = updatedFolder.name?  updatedFolder : initialFolder;
  return [...foldersWithoutChangingOne, folderName];
};

const SingleFolderDetails = ({ folder, setUpdatedFolders, folders }) => {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setUpdatedFolders(
      constructUpdatedFoldersArray(folders, {
        name: newName,
        id: folder.id,
        parts: folder.parts
        
      })
    )
  },[newName])
  return (
    <FolderContainer>
      {folder.id}:{" "}
      <input
        name="editSingleFolder"
        placeholder={folder.name}
        value={newName}
        onChange={(e) =>
          setNewName(e.target.value)
        }
      />
    </FolderContainer>
  );
};

const ManageFoldersDetails = ({ folders }) => {
  const [updatedFolders, setUpdatedFolders] = useState(undefined);

  useEffect(() => {
    setUpdatedFolders(folders);
  }, [folders]);

  useEffect(() => {
    console.log("updatedFolders", updatedFolders);
  }, [updatedFolders]);

  return (
    <FolderInputContainer>
      {folders.map((folder) => (
        <SingleFolderDetails
          folder={folder}
          updatedFolders={updatedFolders}
          setUpdatedFolders={setUpdatedFolders}
          folders={folders}
        />
      ))}
    </FolderInputContainer>
  );
};

export default ManageFoldersDetails;

// I don't like passing folder array down to the component, is there a better way ?
