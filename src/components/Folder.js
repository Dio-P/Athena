import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PartIcon from "./PartIcon";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const FolderContainer = styled.div`
  display: flex;
`;
const FolderButton = styled.div`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Folder = ({ folderName, parts, appId, folders }) => {
  const [display, setDisplay] = useState({
    folderIsExpanded: false,
  });

  const NAME = capitaliseFirstLetters(folderName);
  const triangleUp = () => {
    return (
      <svg height="20" width="20" style={{ fill: "black", stroke: "purple" }}>
        <polygon points="10,30 50,100 200,200" />
      </svg>
    );
  };

  const triangleDown = () => {
    return (
      <svg height="20" width="20" style={{ fill: "black", stroke: "purple" }}>
        <polygon points="10,30 50,100 200,200" />
      </svg>
    );
  };

  const triangle = display.folderIsExpanded ? triangleUp() : triangleDown();

  return (
    <>
      <FolderButton
        onClick={() =>
          setDisplay({
            ...display,
            folderIsExpanded: !display.folderIsExpanded,
          })
        }
      >
        <h4>
          {" "}
          {NAME} {triangle}
        </h4>
      </FolderButton>
      <FolderContainer>
        {display.folderIsExpanded &&
          parts.map((part) => (
            <PartIcon key={part.id} part={part} appId={appId} folders={folders}/>
          ))}
      </FolderContainer>
    </>
  );
};

export default Folder;

// add swaping arrow up and down symbol displaying next to folded rame
// move the triangle to the helper and make them work
