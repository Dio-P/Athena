import styled from "@emotion/styled";
import { useState, useEffect, useMemo } from "react";
import styleVariables from "../styleVariables";

const FolderInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  margin: 20px 40px 30px 20px;
  background-color: #fffcfa;
  border-radius: ${styleVariables.borderRadious.secondary};
`;

const FolderContainer = styled.div`
  flex-flow: row wrap;
  margin-bottom: 6px;
  & input {
    width: 180px;
  }
`;

const constructUpdatedFoldersArray = (folders, updatedFolder) => {
  const initialFolder = folders.find(folder => (folder.id === updatedFolder.id));
  const foldersWithoutChangingOne = folders.filter(
    (folder) => folder.id !== updatedFolder.id
  );
  const folderName = updatedFolder.name?  updatedFolder : initialFolder;
  return [...foldersWithoutChangingOne, folderName];
};

const SingleFolderDetails = ({ folder, setFoldersToUpdateApp, app }) => {
  const [newName, setNewName] = useState(folder.name);

  useEffect(() => {
    setFoldersToUpdateApp(
      constructUpdatedFoldersArray(app.folders, {
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

const ManageFoldersDetails = ({ app, setUpdatedApp }) => {
  const [foldersToUpdateApp, setFoldersToUpdateApp] = useState(app.folders);

  useEffect(() => {
    setUpdatedApp({
      ...app,
      folders: foldersToUpdateApp,
    });
  }, [foldersToUpdateApp]);

  return (
    <FolderInputContainer>
      {app.folders.map((folder) => (
        <SingleFolderDetails
          key={folder.id}
          folder={folder}
          foldersToUpdateApp={foldersToUpdateApp}
          setFoldersToUpdateApp={setFoldersToUpdateApp}
          app={app}
        />
      ))}
    </FolderInputContainer>
  );
};

export default ManageFoldersDetails;

// I don't like passing folder array down to the component, is there a better way ?
