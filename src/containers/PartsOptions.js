import { useMemo } from "react";
import styled from "@emotion/styled";
import PopulateButtons from "./PopulateButtons";
import useParamsHelper from "../hooks/useParamsHelper";
import { useSearchBar } from "../hooks/useAddNewConnectionBlock";
import { SearchBar } from "../components/specialElements";

const PartsOptionsContainer = styled.div`
  display: flex;
  padding: 10px;
  margin: auto;
  overflow: scroll;
  max-height: 250px;
  width: 90%;
`;

const PartsOptions = ({
  dbPartsWithClickedKey,
  setDbPartsWithClickedKey,
  newPartsAdded,
  setNewPartsAdded,
  APP_NAME,
}) => {
  // const appPartsArray = useMemo(
  //   () => dbPartsWithClickedKey && Object.values(dbPartsWithClickedKey),
  //   [dbPartsWithClickedKey]
  // );
  const { keepExistingParams } = useParamsHelper();
  const dbPartsArray = useMemo(
    () => dbPartsWithClickedKey && Object.values(dbPartsWithClickedKey),
    [dbPartsWithClickedKey]
  );

  const newPartsAddedArray = useMemo(
    () => newPartsAdded && Object.values(newPartsAdded),
    [newPartsAdded]
  );

  const options = useMemo(() => newPartsAddedArray? [...dbPartsArray, ...newPartsAddedArray] : dbPartsArray, [dbPartsArray, newPartsAddedArray]);
  const { search, searchingQuery, filteredData } = useSearchBar(options);

  const data = useMemo(() => searchingQuery? filteredData : options, [options, searchingQuery]);
  const isPreexistingPart = (partName) =>
    Object.keys(dbPartsWithClickedKey).includes(partName);

  const isNewPart = (partName) =>
    Object.keys(newPartsAdded).includes(partName);

  const genCorrectObj = (stateContainer, part) => {
    return {
      ...stateContainer,
      [part.name]: {
        ...stateContainer[part.name],
        clicked: !part.clicked,
      },
    }
  }
  
  const updateCorrectStateWithPart = (part) => {
    if(isPreexistingPart(part.name)){
      return setDbPartsWithClickedKey(genCorrectObj(dbPartsWithClickedKey, part))
    }
    if(isNewPart(part.name)){
      console.log("is New Part*************");
      return setNewPartsAdded(genCorrectObj(newPartsAdded, part))
    }
    return undefined;
  }

  const onClickingPart = (part) => {
    if (part) {
      updateCorrectStateWithPart(part);
    }
    keepExistingParams();
  };
  return (
    <>
      <label htmlFor="">Existing {APP_NAME} Parts</label>
      <SearchBar searchingQuery={searchingQuery} search={search} />
      <PartsOptionsContainer>
        <PopulateButtons
          data={data}
          onClickFunction={(part) => onClickingPart(part)}
          type="checkbox"
          renderConditional={isNewPart}
        />
      </PartsOptionsContainer>
    </>
  );
};

export default PartsOptions;
