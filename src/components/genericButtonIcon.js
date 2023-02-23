import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";
import { tickIcon, arrowDownIcon, arrowUpIcon } from "../helpers/svgIcons";
import { WarningElement } from "./specialElements";
import { defaultProps } from "default-props";
import PropTypes from 'prop-types';

const dropDownButton = {
  ContainerWrapper: styled.div`
    display: flex;
    border: solid black;
    align-content: center;
    width: 300px;
    height: 35px;
    align-items: center;
    border-radius: ${styleVariables.borderRadious.secondary};
  `,
  Container: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
  `,
  ArrowContainer: styled.div`
    height: 20px;
    width: 20px;
  `,
};

const smallButton = {
  Wrapper: styled.div`
    display: flex;
    right: 0;
    height: 35px;
    width: 35px;
    color: black;
    background-color: ${styleVariables.colours.primaryPink};
    box-shadow: ${styleVariables.boxShadow.smallButton};
    border-radius: ${styleVariables.borderRadious.secondary};
    margin: 8px;
    align-self: end;
    cursor: pointer;
  `,
  IconContainer: styled.div`
    display: flex;
    align-items: center;
    font-size: 35px;
    margin: auto;
    width: 22px;
    height: 100%;
  `,
};

const mainBtn = {
  Wrapper: styled.div`
    display: flex;
    width: 14em;
    cursor: pointer;
    margin: 7px;
  `,
  AddingVersionContainer: styled.div`
    display: flex;
    align-content: center;
    background-color: ${styleVariables.colours.primaryPink};
    min-width: 100px;
    min-height: 50px;
    max-width: 140px;
    max-height: 60px;
    width: 90%;
    height: 90%;
    box-shadow: ${styleVariables.boxShadow.bigButton};
    border-radius: ${styleVariables.borderRadious.main};
    margin: 20px;
    font-size: 14px;
  `,
  ClickedVersionContainer: styled.div`
    display: flex;
    align-content: center;
    background-color: ${styleVariables.colours.primaryBlue};
    width: 100%;
    border: solid ${styleVariables.colours.primaryGreen};
    border-radius: ${styleVariables.borderRadious.main};
    margin: 20px 0px 20px 10px;
    font-size: 18px;
  `,
  PlainVersionContainer: styled.div`
    display: flex;
    align-content: center;
    background-color: ${styleVariables.colours.primaryBlue};
    width: 100%;
    border-radius: ${styleVariables.borderRadious.main};
    margin: 20px 0px 20px 0px;
    font-size: 18px;
    box-shadow: ${styleVariables.boxShadow.bigButton};
  `,
  LabelContainer: styled.div`
    margin: auto;
    color: ${styleVariables.colours.primaryLight};
    padding: 8px;
    min-width: 141px;
    min-height: 50px;
    max-width: 140px;
    max-height: 60px;
    display: flex;
    align-items: center;
    text-align: left;
  `,
  Label: styled.div`
    display: flex;
    align-items: center;
  `,
  TickBoxWrapper: styled.div`
    display: flex;
    border-radius: ${styleVariables.borderRadious.main};
    align-items: center;
    background-color: ${styleVariables.colours.primaryBlue};
    width: 100%;
    min-width: 30px;
    max-width: 60px;
  `,
  TickBox: styled.div`
    border-radius: ${styleVariables.borderRadious.main};
    background-color: ${styleVariables.colours.primaryLight};
    margin: auto;
    height: 80%;
    width: 80%;
  `,
};

const SmallButton = ({ icon, onClickFunction, type }) => {
  console.log("icon", icon);
  return (
    <smallButton.Wrapper
      onClick={onClickFunction}
      aria-label={`${icon.props["aria-label"]} button`}
    >
      <smallButton.IconContainer>{icon}</smallButton.IconContainer>
    </smallButton.Wrapper>
  );
};

const MainButton = ({
  CustomButtonContainer,
  type,
  label,
  clicked,
  onClickFunction,
}) => {
  return (
    <mainBtn.Wrapper onClick={onClickFunction} aria-label={`${type} button`}>
      <CustomButtonContainer>
        <mainBtn.LabelContainer>
          <mainBtn.Label>{capitaliseFirstLetters(label)}</mainBtn.Label>
        </mainBtn.LabelContainer>
        {type !== "add" && (
          <mainBtn.TickBoxWrapper>
            <mainBtn.TickBox>{clicked && tickIcon}</mainBtn.TickBox>
          </mainBtn.TickBoxWrapper>
        )}
      </CustomButtonContainer>
    </mainBtn.Wrapper>
  );
};

const DropDownButton = ({
  onClickFunction,
  isMenuOpen,
  folderOfNewPart,
  clickedFolder,
  type,
}) => {
  const dropDownToogleButtonTitle = folderOfNewPart
    ? `Folder to display new part in: ${capitaliseFirstLetters(clickedFolder)}`
    : "Choose a folder to display part in";
  return (
    <dropDownButton.ContainerWrapper aria-label={`${type} button`}>
      <dropDownButton.Container onClick={onClickFunction}>
        <div> {dropDownToogleButtonTitle} </div>
        <dropDownButton.ArrowContainer>
          {isMenuOpen ? arrowUpIcon : arrowDownIcon}
        </dropDownButton.ArrowContainer>
      </dropDownButton.Container>
    </dropDownButton.ContainerWrapper>
  );
};

const GenericButtonIcon = ({
  label,
  clicked,
  type,
  icon,
  onClickFunction,
  renderConditional,
  isMenuOpen,
  folderOfNewPart,
  clickedFolder,
}) => {
  if (type === "small") {
    return (
      <SmallButton icon={icon} onClickFunction={onClickFunction} type={type} />
    );
  }
  if (type === "add") {
    return (
      <MainButton
        CustomButtonContainer={mainBtn.AddingVersionContainer}
        type={type}
        label={label}
        clicked={clicked}
        onClickFunction={onClickFunction}
      />
    );
  }
  if (type === "checkbox" && !!clicked) {
    return (
      <MainButton
        CustomButtonContainer={mainBtn.ClickedVersionContainer}
        type={type}
        label={label}
        clicked={clicked}
        onClickFunction={onClickFunction}
      />
    );
  }
  if (type === "dropDown") {
    return (
      <DropDownButton
        onClickFunction={onClickFunction}
        isMenuOpen={isMenuOpen}
        folderOfNewPart={folderOfNewPart}
        clickedFolder={clickedFolder}
        type={type}
      />
    );
  }
  return (
    <div>
      <MainButton
        CustomButtonContainer={mainBtn.PlainVersionContainer}
        type={type}
        label={label}
        clicked={clicked}
        onClickFunction={onClickFunction}
      />
      {/* {renderConditional(label) && <WarningElement info="will be deleted if not choosen" />} */}
    </div>
  );
};

export default GenericButtonIcon;

GenericButtonIcon.propTypes = {

}

// make everything left align
// for the parts:
// make a greed
// to be scrolling down in case of more than two rows of three
// add a finder
// for the folder:
// make it a dropdown
// when clicked, the same functionality ass the tick but instead of tick same green smaller shape as the white box
// make this a dropdown
// to add new have a popup with the existing box
// instead of back to existing folders have a pink X top right
// "if you leave this folder empty it will be deleted"
