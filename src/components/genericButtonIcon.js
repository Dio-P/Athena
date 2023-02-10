import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import capitaliseFirstLetter from "../helpers/capitaliseFirstLetter";

const WholeButtonWrapper = styled.div`
  display: flex;
  margin: auto;
`;

const ClickedPlainButtonIconContainer = styled.div`
  display: flex;
  align-content: center;
  background-color: #1ee685;
  min-width: 115px;
  min-height: 50px;
  max-width: 140px;
  max-height: 60px;
  width: 100%;
  height: 100%;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  border-radius: 15px 10%;
  margin: 20px;
  font-size: 18px;
`;

const PlainButtonIconContainer = styled.div`
  display: flex;
  align-content: center;
  background-color: #1d4587;
  min-width: 115px;
  min-height: 50px;
  max-width: 140px;
  max-height: 60px;
  width: 100%;
  height: 100%;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  border-radius: 15px 10%;
  margin: 20px;
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
`;

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
    <WholeButtonWrapper>
      <CustomButtonContainer>
        <BtnLabelContainer>
          {capitaliseFirstLetter(label)}
        </BtnLabelContainer>
      </CustomButtonContainer>
    </WholeButtonWrapper>
  );
};

export default GenericButtonIcon;
