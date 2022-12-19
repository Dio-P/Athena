import { useState } from "react";
import styled from "@emotion/styled";
import PartIcon from "./PartIcon";

const FolderContainer = styled.div`
  display: flex;
`;
const FolderButton = styled.button`
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
`;

const Folder = ({ folderName, parts }) => {
  const [display, setDisplay] = useState({
    folderIsExpanded : false
  })
  return (
    <>
      <FolderButton onClick={() => setDisplay({
        ...display, 
        folderIsExpanded: !display.folderIsExpanded})
        }>
        <h4> {folderName} </h4>
      </FolderButton>
      <FolderContainer>
        {display.folderIsExpanded
        &&
          parts.map((part) => (
            <PartIcon part={part}/>
          ))
        }

      </FolderContainer>
    </>
  )
}

export default Folder;