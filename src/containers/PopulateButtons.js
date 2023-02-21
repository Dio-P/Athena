import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { useCallback } from "react";
import { useEffect } from "react";
import ButtonUnit from "./ButtonUnit"

const GenericButtonIconWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const PopulateButtons = ({ 
  data, 
  onClickFunction,
  type,
  renderConditional
}) => {

  return (
    data &&
    <GenericButtonIconWrapper>

      {data.map((choice, index) => (
        <GenericButtonIcon
          key={index}
          onClickFunction={() => onClickFunction(choice)}
          label={choice.name}
          clicked={choice.clicked}
          type={type}
          renderConditional={renderConditional}
        />
      ))}
    </GenericButtonIconWrapper>
  )
}

export default PopulateButtons