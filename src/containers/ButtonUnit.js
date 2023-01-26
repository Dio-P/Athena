import styled from "@emotion/styled";
import GenericButtonIcon from "../components/ButtonIcon";

const SimpleButtonWrapper = styled.button`
  margin: auto;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const NewlyAddedPartButtonWrapper = styled.button`
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
  conditionalDisplay
}) => {
  const ButtonWrapper = !onMouseEnterFunction? SimpleButtonWrapper : NewlyAddedPartButtonWrapper;
  return (
  <ButtonWrapper 
    onClick={onClickFunction}
    onMouseEnter={onMouseEnterFunction}
    onMouseLeave={onMouseLeaveFunction}
  >
    <GenericButtonIcon
      addingButton={addingButton}
      buttonTitle={buttonTitle}
      folder={folder}
      part={part}
    />
    {conditionalDisplay
    &&
    conditionalDisplay
    }
  </ButtonWrapper>
)
};

export default ButtonUnit