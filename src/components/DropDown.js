import { useMemo } from "react";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";
import ButtonUnit from "../containers/ButtonUnit";
import useParamsHelper from "../hooks/useParamsHelper";

const DropDownUnitWrapper = styled.div`
  border: solid red;
  height: 100%;
  width: 180px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  height: 100px;
  width: 180px;
  flex-direction: column;
  align-items: center;
  border: solid red;
  overflow: scroll;
`;

const SingleDropDownElement = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  height: 45px;
  background-color: ${styleVariables.colours.mainBlue};
  border-radius: ${styleVariables.borderRadious.main};
  color: ${styleVariables.colours.lightLetters};
  margin: 1px;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const DropDown = ({
  preexistingFolders,
  newFolders,
  onClickFunction,
  clickingToAddNewFolder,
  folderOfNewPart
}) => {
  const {
    params: {
      addingNewFolder
    }
  } = useParamsHelper();

  const allFolders = useMemo(
    () =>
      newFolders ? [...preexistingFolders, ...newFolders] : preexistingFolders,
    [preexistingFolders, newFolders]
  );
  return (
    <DropDownUnitWrapper>
      <DropDownWrapper>
        {allFolders.map((folder) => (
          <SingleDropDownElement onClick={() => onClickFunction(folder)}>
            <DropDownLabel>{capitaliseFirstLetters(folder.name)}</DropDownLabel>
          </SingleDropDownElement>
        ))}
      </DropDownWrapper>
      {!folderOfNewPart && (
        <div>
          <ButtonUnit
            onClickFunction={clickingToAddNewFolder}
            type="add"
            label={
              addingNewFolder ? "- Back to Existing Folders" : "+ Add New Folder"
            }
          />
        </div>
      )}
    </DropDownUnitWrapper>
  );
};

export default DropDown;

// rounded corners once arround the main box
