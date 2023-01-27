import styled from "@emotion/styled";

const InputBox = styled.input`
  width: 95%;
  border: solid black;
  border-radius: 8px;
  border-radius: 10px;
  min-width: 200px;
  min-height: 20px;
  height: 24px;
  text-align: center;
  cursor: text;
  margin: 0em;
  padding: 0px;
  border-width: 0px;
`;

const InputContainer = styled.div`
  text-align: center;
  margin-top: 4px;
  border: solid black;
  border-radius: 10px;
  padding: 1px 2px;
  width: 95%;
  min-height: 20px;
  margin: 1em;
`;

const InputUnit = ({ inputTitle, key, type, name, value, onChangeFunction }) => {
  return (
    <InputContainer>
      <label htmlFor="">
        {inputTitle}
      </label>
      <InputBox
        key={key}
        type={type}
        name={name}
        value={value}
        onChange={(e)=>onChangeFunction(e.target.value)}
      />
    </InputContainer>
  )
};

export default InputUnit;