import ButtonUnit from "./ButtonUnit"

const PopulateButtonUnits = ({ data, onClickFunction }) => {
  return (
    data.map((folder) => (
      <ButtonUnit
        onClickFunction={() => onClickFunction(folder)}
        folder={folder.title}
      />
    ))
  )
}

export default PopulateButtonUnits