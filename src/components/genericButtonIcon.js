import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";

const ButtonAndTickBoxWrapper = styled.div`
  display: flex;
  width: 120%;
  
`;

const WholeButtonWrapper = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  width: 100%;

`;

const PlainButtonIconContainer = styled.div`
  display: flex;
  align-content: center;
  background-color: #1d4587;
  width: 100%;
  border-radius: 15px 10%;
  margin: 20px 0px 20px 0px;
  font-size: 18px;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;

`;

const ClickedPlainButtonIconContainer = styled.div`
  display: flex;
  align-content: center;
  background-color: #1d4587;
  width: 100%;
  border: solid #1ee685;
  border-radius: 15px 10%;
  margin: 20px 0px 20px 10px;
  font-size: 18px;
  
`;

const AddingButtonIconContainer = styled.div`
  display: flex;
  align-content: center;
  background-color: #e6056e;
  min-width: 100px;
  min-height: 50px;
  max-width: 140px;
  max-height: 60px;
  width: 90%;
  height: 90%;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  border-radius: 15px 10%;
  margin: 20px;
  font-size: 14px;
`;

const BtnLabelContainer = styled.div`
  margin: auto;
  color: #ffffff;
  padding: 8px;
  min-width: 141px;
  min-height: 50px;
  max-width: 140px;
  max-height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
`;

const BtnLabel = styled.div`
  display: flex;
  align-items: center;
`;


const TickBoxWrapper = styled.div`
  display: flex;
  border-radius: 15px 10%;
  align-items:center;
  background-color: #1d4587;
  width: 100%;
  min-width: 30px;
  max-width: 60px;

`;

const TickBox = styled.div`
  border-radius: 15px 10%;
  background-color: #ffffff;
  margin: auto;
  height: 80%;
  width: 80%;
`;

const Tick = () =>  (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-label="confirm icon"
    // class="css-1n8p6mz"
  >
    <path fill="#1ee685" d="M32 7.2l-2.5-2.4L11 23.3h2L2.4 12.6 0 15.1l12 12.1 20-20z"></path>
  </svg>
);

const GenericButtonIcon = ({
  label,
  clicked,
  type,
}) => {

  const findButtonType = (type, clicked) => {
    console.log("type", type, "clicked", clicked);
    if(type === "add") {
      return AddingButtonIconContainer
    }
    if(!!clicked){
      return ClickedPlainButtonIconContainer
    }
    return PlainButtonIconContainer
  }

  const CustomButtonContainer = findButtonType(type, clicked);

  return (
    <ButtonAndTickBoxWrapper>

      <WholeButtonWrapper>
        <CustomButtonContainer>
          <BtnLabelContainer>
            <BtnLabel>
              {capitaliseFirstLetters(label)}
            </BtnLabel>
          </BtnLabelContainer>
          {type!=="add"
          &&
            <TickBoxWrapper>
              <TickBox>
            {clicked && <Tick/>}
              </TickBox>
            </TickBoxWrapper>
          }
        </CustomButtonContainer>
      </WholeButtonWrapper>
    </ButtonAndTickBoxWrapper>
    
  );
};

export default GenericButtonIcon;

// make everything left align