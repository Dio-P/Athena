import { useCallback } from "react";
import { useEffect } from "react";
import ButtonUnit from "./ButtonUnit"

const PopulateButtonUnits = ({ 
  data, 
  onClickFunction,
  addingButton, 
  buttonTitle, 
  folder, 
  part, 
  onMouseEnterFunction, 
  onMouseLeaveFunction,
  conditionalDisplay,
}) => {
  useEffect(() => {
    console.log("data@@@$", data);
    
  }, [data]);

  // const label = () => {
  //   if(!!folder){
  //     return {text: folder.title, type: 'folder'}
  //   }
  //   if(!!part){
  //     return {text: part.name, type: 'part'}
  //   }
  // };

  return (
    data &&
      data.map((choice) => (
        <ButtonUnit
          onClickFunction={() => onClickFunction(choice)}
          label={choice.name}
        />
      ))
  )
}

export default PopulateButtonUnits