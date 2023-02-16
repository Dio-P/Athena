import styled from "@emotion/styled";
import styleVariables from "../styleVariables";


const InputContainer = styled.div`
  text-align: left;
  margin-top: 4px;
  border-radius: ${styleVariables.borderRadious.secondary};
  padding: 1px 2px;
  width: 95%;
  min-height: 20px;
  margin: auto;
`;

const InputLabel = styled.div`
  margin: 6px;
  color: black;
  font-weight: bold;
`;

const InputBox = styled.input`
  width: 95%;
  border: solid ${styleVariables.colours.tertiaryOrange};
  border-radius: ${styleVariables.borderRadious.secondary};
  min-width: 200px;
  min-height: 20px;
  height: 24px;
  text-align: center;
  cursor: text;
  margin: 0em;
  padding: 0px;
`;

const InputUnit = ({ inputTitle, type, name, value, onChangeFunction }) => {
  return (
    <InputContainer>
      <InputLabel>{inputTitle}</InputLabel>
      <InputBox
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
      />
    </InputContainer>
  );
};

export default InputUnit;
