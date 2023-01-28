import { useEffect } from "react";
import ButtonUnit from "./ButtonUnit"

const PopulateButtonUnits = ({ data, onClickFunction }) => {
  useEffect(() => {
    console.log("data@@@$", data);
    
  }, [data]);
  return (
    data &&
      data.map((folder) => (
        <ButtonUnit
          onClickFunction={() => onClickFunction(folder)}
          folder={folder.title}
        />
      ))
  )
}

export default PopulateButtonUnits