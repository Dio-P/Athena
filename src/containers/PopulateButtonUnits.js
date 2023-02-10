import styled from "@emotion/styled";
import { useCallback } from "react";
import { useEffect } from "react";
import ButtonUnit from "./ButtonUnit"

const ButtonUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopulateButtonUnits = ({ 
  data, 
  onClickFunction,
  clicked,
  type,
}) => {

  return (
    data &&
    <ButtonUnitWrapper>

      {data.map((choice, index) => (
        <ButtonUnit
          key={index}
          onClickFunction={() => onClickFunction(choice)}
          label={choice.name}
          clicked={choice.clicked || clicked}
          type={type}
        />
      ))}
    </ButtonUnitWrapper>
  )
}

export default PopulateButtonUnits