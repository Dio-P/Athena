import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const EditPartContainer = styled.div`
  height: 100%;
  color: black;
`;

const LabelInputPair = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 20px ;
  & label {
    margin-bottom: 5px;
  }
}`;


const EditPart = ({ part, folders }) => {
  const [partName, setPartName]= useState(part.name);
  const [partType, setPartType]= useState(part.type);
  const [partGhRepo, setPartGhRepo]= useState(part.ghRepo);
  const [partFolderToBeDisplayedIn, setPartFolderToBeDisplayedIn]= useState(part.folderToBeDisplayedIn);

  console.log("part", part);
  console.log("folders", folders);

  useEffect(() => {
    console.log("partName", partName);
     
  }, [partName])
  return (
    <EditPartContainer>
      <LabelInputPair>
        <label htmlFor="">Name</label>
        <input type="text" value={partName} onChange={(e) => setPartName(e.target.value)}/>
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Type</label>
        <input type="text" value={partType} onChange={(e) => setPartType(e.target.value)}/>
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Gh Repo</label>
        <input type="text" value={partGhRepo} onChange={(e) => setPartGhRepo(e.target.value)}/>
      </LabelInputPair>
      <LabelInputPair>
        <label htmlFor="">Folder</label>
        <input type="text" value={partFolderToBeDisplayedIn} onChange={(e) => setPartFolderToBeDisplayedIn(e.target.value)}/>
      </LabelInputPair>
    </EditPartContainer>
  );
};

export default EditPart;
