import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PartIcon from "./PartIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

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
  });

  const NAME = useCapitaliseFirstLetter(folderName);
  const triangleUp = () => {
    return (
      <svg height="20" width="20" style={{fill:"black", stroke:"purple"}}>
        <polygon points="10,30 50,100 200,200"/>
      </svg>
    )
  };

  const triangleDown = () => {
    return (
      <svg height="20" width="20" style={{fill:"black", stroke:"purple"}}>
        <polygon points="10,30 50,100 200,200"/>
      </svg>
    )
  };

  const triangle = display.folderIsExpanded? triangleUp(): triangleDown()

    
  return (
    <>
      <FolderButton onClick={() => setDisplay({
        ...display, 
        folderIsExpanded: !display.folderIsExpanded})
        }>
        <h4> { NAME } {triangle}</h4>
        
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

// add swaping arrow up and down symbol displaying next to folded rame