import styled from "@emotion/styled";
import GenericButtonIcon from "../components/genericButtonIcon";

const SimpleButtonContainer = styled.button`
  margin: auto;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const NewlyAddedPartButtonContainer = styled.button`
  margin: auto;
  background: none;
  color: red;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    border: red solid;
  }
`;

const ButtonUnit = ({ 
  onClickFunction,
  addingButton, 
  buttonTitle, 
  folder, 
  part, 
  onMouseEnterFunction, 
  onMouseLeaveFunction,
  conditionalDisplay,
  label
}) => {
  const ButtonWrapper = !onMouseEnterFunction? SimpleButtonContainer : NewlyAddedPartButtonContainer;
  return (
  <ButtonWrapper 
    onClick={onClickFunction}
    onMouseEnter={onMouseEnterFunction}
    onMouseLeave={onMouseLeaveFunction}
  >
    <GenericButtonIcon
      addingButton={addingButton}
      buttonTitle={buttonTitle}
      // folder={folder}
      // part={part}
      label={label}
    />
    {conditionalDisplay
    &&
    conditionalDisplay
    }
  </ButtonWrapper>
)
};

export default ButtonUnit