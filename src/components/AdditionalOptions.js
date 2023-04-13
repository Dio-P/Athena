import styled from "@emotion/styled";
import styleVariables from "../styleVariables";

const AdditionalOptionsContainer = styled.div`

`;

const OptionWrapper = styled.div`
  display: flex;
  background-color: ${styleVariables.colours.primaryBlue};

  & :hover {
    background-color: ${styleVariables.colours.secondaryBlue};
  }
`;

const Option = ({option}) => {
  return (
    <OptionWrapper>
      {option.title}
    </OptionWrapper>
  )
}


const AdditionalOptions = ({options}) => {
  return (
    <AdditionalOptionsContainer>
      {
      options.map((option)=> (
        <Option option={option}/>
      ))
      }
    </AdditionalOptionsContainer>

  ) 
};

export default AdditionalOptions;