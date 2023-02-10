import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";

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
  onMouseEnterFunction, 
  onMouseLeaveFunction,
  conditionalDisplay,
  label,
  clicked,
  type
}) => {
  const ButtonWrapper = !onMouseEnterFunction? SimpleButtonContainer : NewlyAddedPartButtonContainer;
  return (
  <ButtonWrapper 
    onClick={onClickFunction}
    onMouseEnter={onMouseEnterFunction}
    onMouseLeave={onMouseLeaveFunction}
  >
    <GenericButtonIcon
      // addingButton={addingButton}
      label={label}
      clicked={clicked}
      type={type}
    />
    {conditionalDisplay
    &&
    conditionalDisplay
    }
  </ButtonWrapper>
)
};

export default ButtonUnit