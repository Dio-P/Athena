import { useCallback } from "react";
import { useEffect } from "react";
import ButtonUnit from "./ButtonUnit"

const PopulateButtonUnits = ({ 
  data, 
  onClickFunction,
  clicked,
  addingButton, 
  buttonTitle, 
  folder, 
  part, 
  onMouseEnterFunction, 
  onMouseLeaveFunction,
  conditionalDisplay,
}) => {

  return (
    data &&
      data.map((choice, index) => (
        <ButtonUnit
          key={index}
          onClickFunction={() => onClickFunction(choice)}
          label={choice.name}
          clicked={choice.clicked || clicked}
        />
      ))
  )
}

export default PopulateButtonUnits