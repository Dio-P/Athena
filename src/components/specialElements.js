import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { warningIcon, magnifyingGlassIcon } from "../helpers/svgIcons";
import styleVariables from "../styleVariables";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

// WarningElement element styles \/

const WarningElementWrapper = styled.div`
  color: red;
  margin: 5px 2px 8px;
`;

const WarningHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WarningIconContainer = styled.div`
  height: 20px;
  width: 20px;
`;

// useSearchBar element styles \/

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

export const WarningElement = ({ info }) => {
  return (
    <WarningElementWrapper>
      <WarningHeaderContainer>
        <WarningIconContainer>
          {warningIcon}
        </WarningIconContainer>
        <strong>Warning: </strong>  
      </WarningHeaderContainer>
      {info}
    </WarningElementWrapper>
  ) 
};

export const useSearchBar = (allData) => {
  const [searchingQuery, setSearchingQuery] = useState(undefined);

  const filteredData = useMemo(
    () => allData.filter((folder) => folder.name.includes(searchingQuery)),
    [searchingQuery]
  );

  const searchFolder = (e) => {
    setSearchingQuery(e.target.value);
  };

   const Searchbar = () => (
    <SearchBarWrapper>
    <MagnifyingGlassIconWrapper>{magnifyingGlassIcon}</MagnifyingGlassIconWrapper>
    <SearchInput
      type="text"
      name="dropDownSearch"
      value={searchingQuery}
      onChange={searchFolder}
    />
  </SearchBarWrapper>
  );

  return {Searchbar, searchingQuery, filteredData};
}