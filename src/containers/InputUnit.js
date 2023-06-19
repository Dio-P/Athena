import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import { regex } from "../helpers/validators";
import { WarningElement } from "../components/specialElements";

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
`;

const InputUnit = ({ inputTitle, type, name, value, onChangeFunction, required, isValueInvalid, setIsValueInvalid }) => {

  // const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(value && regex[type]){
      const isValid = regex[type].validator.test(value);
      // setIsInvalid(!isValid);
      setIsValueInvalid(!isValid);
      setErrorMessage(regex[type].warningMessage)
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
      {isValueInvalid &&
      <WarningElement
        info={errorMessage}
      />
      }
    </InputContainer>
  );
};

export default InputUnit;

// fix invaled not working
// add com
