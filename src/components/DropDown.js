import { useMemo, useState } from "react";
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

const SearchBarWrapper = styled.div``;

const OptionsWrapper = styled.div`
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
  preexistingData,
  newData,
  onClickFunction,
  // clickingToAddNewFolder,
  folderOfNewPart,
}) => {
  const {
    clickingToAddNewFolder,
    params: { folderDdOpen },
  } = useParamsHelper();

  const [searchingQuery, setSearchingQuery] = useState(undefined);

  const allData = useMemo(
    () =>
      newData ? [...preexistingData, ...newData] : preexistingData,
    [preexistingData, newData]
  );

  const filteredData = useMemo(
    () => allData.filter((folder) => folder.name.includes(searchingQuery)),
    [searchingQuery]
  );

  const foldersToRender = !searchingQuery ? allData : filteredData;

  const searchFolder = (e) => {
    setSearchingQuery(e.target.value);
  };
  return (
    <DropDownUnitWrapper>
      <SearchBarWrapper>
        <input
          type="text"
          name="dropDownSearch"
          value={searchingQuery}
          onChange={searchFolder}
        />
      </SearchBarWrapper>
      <OptionsWrapper>
        {foldersToRender.map((folder) => (
          <SingleDropDownElement onClick={() => onClickFunction(folder)}>
            <DropDownLabel>{capitaliseFirstLetters(folder.name)}</DropDownLabel>
          </SingleDropDownElement>
        ))}
      </OptionsWrapper>
      {!folderOfNewPart && (
        <div>
          <ButtonUnit
            onClickFunction={clickingToAddNewFolder}
            type="add"
            label="+ Add New Folder"
          />
        </div>
      )}
    </DropDownUnitWrapper>
  );
};

export default DropDown;

// rounded corners once arround the main box
// change this to a generic component that can be reused
