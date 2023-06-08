import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";
import { SearchBar } from "./specialElements";
import { useSearchBar } from "../hooks/useAddNewConnectionBlock";
import GenericButtonIcon from "./GenericButtonIcon";
import useParamsHelper from "../hooks/useParamsHelper";

const DropDownContainer = styled.div`
  display: flex;
`;

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
  newFolder,
  onClickingAdditionalOption,
  dDBtnLabel,
  isDropdownOpen,
  chosenValue
  // newFolder,
}) => {
  const allData = useMemo(
    () =>
      newFolder ? [...preexistingData, newFolder] : preexistingData,
    [preexistingData, newFolder]
  );

  const { search, searchingQuery, filteredData } = useSearchBar(allData);
  const {
    manageFolderDdOpenParam,
    params: { isDdOpen },
  } = useParamsHelper();

  const optionsToRender = !searchingQuery ? allData : filteredData;

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
    <DropDownContainer>
      <GenericButtonIcon
        onClickFunction={manageFolderDdOpenParam}
        type="dropDown"
        isMenuOpen={isDdOpen}
        newFolder={newFolder}
        chosenValue={chosenValue}
      />
      {isDropdownOpen &&
        <DropDownUnitWrapper>
          <SearchBar searchingQuery={searchingQuery} search={search} />
          <OptionsWrapper>
            {optionsToRender.map((folder, index) => (
              <SingleDropdownElement
                onClickFunction={() => onClickFunction(folder)}
                label={folder.name}
                key={index}
              />
            ))}
          </OptionsWrapper>
          <SingleDropdownElement
            onClickFunction={onClickingAdditionalOption}
            label={dDBtnLabel}
            isAddFolderBtn={true}
          />
        </DropDownUnitWrapper>
      }
    </DropDownContainer>
  );
};

export default DropDown;

// rounded corners once arround the main box
// change this to a generic component that can be reused
