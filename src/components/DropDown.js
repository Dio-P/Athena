import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";
import { magnifyingGlassIcon } from "../helpers/svgIcons";
import ButtonUnit from "../containers/ButtonUnit";

const DropDownUnitWrapper = styled.div`
  display: flex;
  border-radius: ${styleVariables.borderRadious.main};
  box-shadow: ${styleVariables.boxShadow.bigButton};
  flex-direction: column;
  align-content: center;
  background-color: ${styleVariables.colours.primaryLight};
  border: solid ${styleVariables.colours.secondaryOrange};
  padding: 6px 7px;
  overflow: hidden;  
  height: 100%;
  width: 200px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  margin-bottom: 3px;
`;

const MagnifyingGlassIconWrapper = styled.div`
  width: 23px;
  height: 23px;
  padding: 3px;
`;

const SearchInput = styled.input`
  width: 100%;
  margin-right: 3px;
  border-radius: ${styleVariables.borderRadious.main};
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border-radius: ${styleVariables.borderRadious.main};
`;

const SingleDropDownElement = styled.div`
  display: flex;
  align-items: center;
  width: 99%;
  height: 45px;
  background-color: ${(props) =>
    !props.dropDownButton
      ? styleVariables.colours.tertiaryBlue
      : styleVariables.colours.tertiaryPink};
  border-radius: ${(props) =>
    !props.dropDownButton ? null : styleVariables.borderRadious.main};
  color: black;
  margin: 1px;
  margin-top: ${(props) => props.dropDownButton && "4px"};

  &:hover {
    background-color: ${(props) =>
      !props.dropDownButton
        ? styleVariables.colours.secondaryBlue
        : styleVariables.colours.secondaryPink};
  }
  cursor: pointer;
`;

const DropDownLabel = styled.div`
  margin: auto;
`;

const DropDown = ({
  preexistingData,
  newData,
  onClickFunction,
  folderOfNewPart,
  onClickingBtnFunction,
  dDBtnLabel,
  // folderOfNewPart,
}) => {
  const [searchingQuery, setSearchingQuery] = useState(undefined);

  const allData = useMemo(
    () => (folderOfNewPart ? [...preexistingData, folderOfNewPart] : preexistingData),
    [preexistingData, folderOfNewPart]
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
        <MagnifyingGlassIconWrapper>{magnifyingGlassIcon}</MagnifyingGlassIconWrapper>
        <SearchInput
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
      <SingleDropDownElement
        dropDownButton={true}
        onClick={onClickingBtnFunction}
      >
        <DropDownLabel>{capitaliseFirstLetters(dDBtnLabel)}</DropDownLabel>
      </SingleDropDownElement>
    </DropDownUnitWrapper>
  );
};

export default DropDown;

// rounded corners once arround the main box
// change this to a generic component that can be reused
