import { useMemo } from "react";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid red;
`;

const SingleDropDownElement = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  height: 45px;
  background-color: ${ styleVariables.colours.mainBlue };
  border-radius: ${ styleVariables.borderRadious.main };
  color: ${ styleVariables.colours.lightLetters };
  margin: 1px;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const DropDown = ({ preexistingFolders, newFolders, onClickFunction }) => {
  const allFolders = useMemo(
    () =>
      newFolders ? [...preexistingFolders, ...newFolders] : preexistingFolders,
    [preexistingFolders, newFolders]
  );
  return (
    <DropDownWrapper>
      {allFolders.map((folder) => (
        <SingleDropDownElement onClick={() => onClickFunction(folder)}>
          <DropDownLabel>
            {capitaliseFirstLetters(folder.name)}
          </DropDownLabel>
        </SingleDropDownElement>
      ))}
    </DropDownWrapper>
  );
};

export default DropDown;

// rounded corners once arround the main box