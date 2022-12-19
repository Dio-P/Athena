import { useState } from "react";
import styled from "@emotion/styled";
import PartIcon from "./PartIcon";

const FolderContainer = styled.div`
  display: flex;
`;
const Button = styled.button`
margin: auto;
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
    <FolderContainer>
      <Button onClick={() => setDisplay({
        ...display, 
        folderIsExpanded: !display.folderIsExpanded})
        }>
        <h4> {folderName} </h4>
      </Button>
      {display.folderIsExpanded
      &&
        parts.map((part) => (
          <PartIcon part={part}/>
        ))
      }

    </FolderContainer>
  )
}

export default Folder;