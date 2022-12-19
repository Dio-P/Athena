import { useState } from "react";
import styled from "@emotion/styled";
import PartIcon from "./PartIcon";

const FolderContainer = styled.div`
  display: flex;
`;

const Folder = ({ folderName, parts }) => {
  const [display, setDisplay] = useState({
    folderIsExpanded : false
  })
  return (
    <FolderContainer>
      <h4> {folderName} </h4>
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