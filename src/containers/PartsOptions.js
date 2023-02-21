import { useMemo } from "react";
import styled from "@emotion/styled";
import PopulateButtons from "./PopulateButtons";
import useParamsHelper from "../hooks/useParamsHelper";

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

  const data = useMemo(() => newPartsAddedArray? [...dbPartsArray, ...newPartsAddedArray] : dbPartsArray, [dbPartsArray, newPartsAddedArray]);

  const isPartInDbPartsWithClickedKey = (partName) =>
    Object.keys(dbPartsWithClickedKey).includes(partName);

  const isPartInNewPartsAdded = (partName) =>
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
    if(isPartInDbPartsWithClickedKey(part.name)){
      return setDbPartsWithClickedKey(genCorrectObj(dbPartsWithClickedKey, part))
    }
    if(isPartInNewPartsAdded(part.name)){
      return setNewPartsAdded(genCorrectObj(newPartsAdded, part))
    }
    return undefined;
  }

  const onClickingPart = (part) => {
    console.log("onClickingPart clicked, part is:", part);
    if (part) {
      updateCorrectStateWithPart(part);
    }
    keepExistingParams();
  };
  return (
    <>
      <label htmlFor="">Existing {APP_NAME} Parts</label>
      <PartsOptionsContainer>
        <PopulateButtons
          data={data}
          onClickFunction={(part) => onClickingPart(part)}
        />
      </PartsOptionsContainer>
    </>
  );
};

export default PartsOptions;
