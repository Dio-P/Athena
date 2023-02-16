import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";
import ButtonUnit from "../containers/ButtonUnit";

const DropDownUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  border: solid red;
  height: 100%;
  width: 200px;
`;

const SearchBarWrapper = styled.div``;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const SingleDropDownElement = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: ${(props) =>
    !props.dropDownButton
      ? styleVariables.colours.mainBlue
      : styleVariables.colours.mainPink};
  border-radius: ${styleVariables.borderRadious.main};
  color: ${styleVariables.colours.lightLetters};
  margin: 1px;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const DropDownButton = styled.div`
  background-color: ${styleVariables.colours.mainPink};
`;

const DropDown = ({
  preexistingData,
  newData,
  onClickFunction,
  folderOfNewPart,
  onClickingBtnFunction,
  dDBtnLabel,
}) => {
  const [searchingQuery, setSearchingQuery] = useState(undefined);

  const allData = useMemo(
    () => (newData ? [...preexistingData, ...newData] : preexistingData),
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
          <SingleDropDownElement
            dropDownButton={true}
            onClick={onClickingBtnFunction}
          >
            {dDBtnLabel}
          </SingleDropDownElement>
        </div>
      )}
    </DropDownUnitWrapper>
  );
};

export default DropDown;

// rounded corners once arround the main box
// change this to a generic component that can be reused
