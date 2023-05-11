import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import DropDown from "../components/DropDown";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const EditPartContainer = styled.div`
  height: 100%;
  width: 260px;
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
  const [isFolderDropdownOpen, setIsFolderDropdownOpen]= useState(false);

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
        {/* change the one bellow to the right button when made */}
        <button onClick={() => setIsFolderDropdownOpen(!isFolderDropdownOpen)}>
        {capitaliseFirstLetters(folders[partFolderToBeDisplayedIn].name)}
        </button>
        {isFolderDropdownOpen &&
        <DropDown
          preexistingData={folders}
          dDBtnLabel="+ Add New Folder"
        />
        }
      </LabelInputPair>
    </EditPartContainer>
  );
};

export default EditPart;
