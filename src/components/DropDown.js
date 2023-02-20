import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";
import { magnifyingGlassIcon } from "../helpers/svgIcons";
import { SearchBar } from "./specialElements";
import { useSearchBar } from "../hooks/useAddingDocHelpers";
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

const SingleDropDownElementWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 99%;
  height: 45px;
  background-color: ${(props) =>
    !props.isAddFolderBtn
      ? styleVariables.colours.tertiaryBlue
      : styleVariables.colours.tertiaryPink};
  border-radius: ${(props) =>
    !props.isAddFolderBtn ? null : styleVariables.borderRadious.main};
  color: black;
  margin: 1px;
  margin-top: ${(props) => props.isAddFolderBtn && "4px"};

  &:hover {
    background-color: ${(props) =>
      !props.isAddFolderBtn
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
  const allData = useMemo(
    () =>
      folderOfNewPart ? [...preexistingData, folderOfNewPart] : preexistingData,
    [preexistingData, folderOfNewPart]
  );

  const { search, searchingQuery, filteredData } = useSearchBar(allData);

  const foldersToRender = !searchingQuery ? allData : filteredData;

  const SingleDropdownElement = ({
    onClickFunction,
    label,
    isAddFolderBtn,
  }) => {
    return (
      <SingleDropDownElementWrapper
        onClick={onClickFunction}
        isAddFolderBtn={isAddFolderBtn}
      >
        <DropDownLabel>{capitaliseFirstLetters(label)}</DropDownLabel>
      </SingleDropDownElementWrapper>
    );
  };

  return (
    <DropDownUnitWrapper>
      <SearchBar searchingQuery={searchingQuery} search={search} />
      <OptionsWrapper>
        {foldersToRender.map((folder) => (
          <SingleDropdownElement
            onClickFunction={() => onClickFunction(folder)}
            label={folder.name}
          />
        ))}
      </OptionsWrapper>
      <SingleDropdownElement
        onClickFunction={onClickingBtnFunction}
        label={dDBtnLabel}
        isAddFolderBtn={true}
      />
    </DropDownUnitWrapper>
  );
};

export default DropDown;

// rounded corners once arround the main box
// change this to a generic component that can be reused
