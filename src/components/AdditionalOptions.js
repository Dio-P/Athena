import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const AdditionalOptionsContainer = styled.div`
  margin: auto;


`;

const OptionWrapper = styled.div`
  display: flex;
  background-color: ${styleVariables.colours.primaryBlue};

  & :hover {
    background-color: ${styleVariables.colours.secondaryBlue};
  }
`;

const Option = ({option}) => {
  const {title, onClickFunction} = option
  return (
    <OptionWrapper onClick={onClickFunction}>
      {capitaliseFirstLetters(title)}
    </OptionWrapper>
  )
}


const AdditionalOptions = ({options}) => {
  return (
    <AdditionalOptionsContainer>
      {
      options.map((option)=> (
        <Option 
          option={option}
          key={`${option.name}Option`}
        />
      ))
      }
    </AdditionalOptionsContainer>

  ) 
};

export default AdditionalOptions;