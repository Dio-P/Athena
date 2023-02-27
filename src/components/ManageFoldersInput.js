import styled from "@emotion/styled";
import { useState, useEffect } from "react";
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

const SingleFolderInput = ({ folder,setUpdatedFolders }) => {
  return (
    <FolderContainer>
      {folder.id}: <input name="editSingleFolder" value={folder.name} onChange={(e) => setUpdatedFolders(e.target.value)}/>
    </FolderContainer>
  );
};

const ManageFoldersInput = ({ folders }) => {
  const [updatedFolders, setUpdatedFolders] = useState(undefined);

  useEffect(() => {
    setUpdatedFolders(folders)
  }, [folders]);
  
  return (
    <FolderInputContainer>
      {folders.map((folder) => (
        <SingleFolderInput folder={folder} setUpdatedFolders={setUpdatedFolders}/>
      ))}
    </FolderInputContainer>
  );
};

export default ManageFoldersInput;
