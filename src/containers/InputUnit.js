import { useEffect } from "react";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import { regex } from "../helpers/validators";

const InputContainer = styled.div`
  text-align: left;
  margin-top: 4px;
  border-radius: ${styleVariables.borderRadious.secondary};
  padding: 1px 2px;
  width: 95%;
  min-height: 20px;
  margin: auto;
}
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

  &:valid {
    background-color: ivory;
    border: none;
    outline: 2px solid deepskyblue;
    border-radius: 5px;
    accent-color: gold;

  &:input:invalid {
      background-color: ivory;
      border: none;
      outline: 2px solid red;
      border-radius: 5px;
  }
`;

const InputUnit = ({ inputTitle, type, name, value, onChangeFunction, required }) => {

  useEffect(() => {
    if(regex[type]){
      const isValid = regex[type].test(value);
      console.log("isValid***", isValid);
    }
  }, [value]);
  return (
    <InputContainer>
      <InputLabel>{inputTitle}</InputLabel>
      <InputBox
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
        required={required}
      />
    </InputContainer>
  );
};

export default InputUnit;
