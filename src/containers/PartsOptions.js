import { useMemo } from "react";
import styled from "@emotion/styled";
import PopulateButtons from "./PopulateButtons";

const PartsOptionsContainer = styled.div`
  display: flex;
  padding: 10px;
  margin: auto;
`;

const PartsOptions = ({dbPartsWithClickedKey, onClickingPart, newPartsAdded, APP_NAME}) => {
  // const appPartsArray = useMemo(
  //   () => dbPartsWithClickedKey && Object.values(dbPartsWithClickedKey),
  //   [dbPartsWithClickedKey]
  // );
  const dbPartsArray = useMemo(
    () => dbPartsWithClickedKey && Object.values(dbPartsWithClickedKey),
    [dbPartsWithClickedKey]
  );

  const newPartsAddedArray = useMemo(
    () => newPartsAdded && Object.values(newPartsAdded),
    [newPartsAdded]
  );
  return (
    <>
      <label htmlFor="">Existing {APP_NAME} Parts</label>
      <PartsOptionsContainer>
        <PopulateButtons
          data={dbPartsArray}
          // data={appPartsArray}
          onClickFunction={onClickingPart}
        />
        {newPartsAdded && (
          <PopulateButtons
            data={newPartsAddedArray}
            onClickFunction={onClickingPart}
            // onMouseEnterFunction={() =>
            //   setDisplay({ ...display, deleteWarningNewPart: true })
            // }
            // onMouseLeaveFunction={() =>
            //   setDisplay({ ...display, deleteWarningNewPart: false })
            // }
            clicked={true}
            // conditionalDisplay={
            //   display.deleteWarningNewPart && (
            //     <p>Newly added Part: Click to delete</p>
            //   )
            // }
          />
        )}
      </PartsOptionsContainer>
    </>
  );
};

export default PartsOptions;
