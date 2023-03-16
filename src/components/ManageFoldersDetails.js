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

const SingleFolderDetails = ({ folder, setFoldersToUpdateApp, updatedApp }) => {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setFoldersToUpdateApp(
      constructUpdatedFoldersArray(updatedApp.folders, {
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

const ManageFoldersDetails = ({ updatedApp, setUpdatedApp }) => {
  const [foldersToUpdateApp, setFoldersToUpdateApp] = useState(updatedApp.folders);

  // useEffect(() => {
  //   setFoldersToUpdateApp(folders);
  // }, [folders]);

  useEffect(() => {
    console.log("foldersToUpdateApp", foldersToUpdateApp);
    setUpdatedApp({
      ...updatedApp,
      folders: foldersToUpdateApp,
    });
  }, [foldersToUpdateApp]);

  return (
    <FolderInputContainer>
      {foldersToUpdateApp.map((folder) => (
        <SingleFolderDetails
          folder={folder}
          foldersToUpdateApp={foldersToUpdateApp}
          setFoldersToUpdateApp={setFoldersToUpdateApp}
          updatedApp={updatedApp}
        />
      ))}
    </FolderInputContainer>
  );
};

export default ManageFoldersDetails;

// I don't like passing folder array down to the component, is there a better way ?
