import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";
import { tick, arrowDownIcon, arrowUpIcon } from "../helpers/svgIcons";
import { WarningElement } from "./specialElements";

const FolderButtonContainerWrapper = styled.div`
  display: flex;
  border: solid black;
  align-content: center;
  width: 300px;
  height: 35px;
  align-items: center;
  border-radius: ${styleVariables.borderRadious.secondary};
`;

const FolderButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const AddingFolderBodyContainer = styled.div`
  display: flex;
`;

const ArrowContainer = styled.div`
  height: 20px;
  width: 20px;
`;

const ButtonAndTickBoxWrapper = styled.div`
  display: flex;
  width: 14em;
  cursor: pointer;
  margin: 7px;
`;

const WholeButtonWrapper = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  width: 100%;
`;

const SmallButtonWrapper = styled.div`
  right: 0;
  display: flex;
  height: 35px;
  width: 35px;
  color: black;
  background-color: ${styleVariables.colours.primaryPink};
  box-shadow: ${styleVariables.boxShadow.smallButton};
  border-radius: ${styleVariables.borderRadious.secondary};
  margin: 8px;
  align-self: end;
  cursor: pointer;
`;

const SmallButtonIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 35px;
  height: 25px;
  margin: auto;
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
  background-color: ${styleVariables.colours.primaryPink};
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
  align-items: center;
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

const SmallButton = ({ icon, onClickFunction }) => {
  return (
    <SmallButtonWrapper onClick={onClickFunction}>
      <SmallButtonIconContainer>{icon}</SmallButtonIconContainer>
    </SmallButtonWrapper>
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
    <ButtonAndTickBoxWrapper onClick={onClickFunction}>
      <CustomButtonContainer>
        <BtnLabelContainer>
          <BtnLabel>{capitaliseFirstLetters(label)}</BtnLabel>
        </BtnLabelContainer>
        {type !== "add" && (
          <TickBoxWrapper>
            <TickBox>{clicked && tick}</TickBox>
          </TickBoxWrapper>
        )}
      </CustomButtonContainer>
    </ButtonAndTickBoxWrapper>
  );
};

const DropDownButton = ({
  onClickFunction,
  isMenuOpen,
  folderOfNewPart,
  clickedFolder,
}) => {
  const dropDownToogleButtonTitle = folderOfNewPart
    ? `Folder to display new part in: ${capitaliseFirstLetters(clickedFolder)}`
    : "Choose a folder to display part in";
  return (
    <FolderButtonContainerWrapper>
      <FolderButtonContainer onClick={onClickFunction}>
        <div> {dropDownToogleButtonTitle} </div>
        <ArrowContainer>
          {isMenuOpen ? arrowUpIcon : arrowDownIcon}
        </ArrowContainer>
      </FolderButtonContainer>
    </FolderButtonContainerWrapper>
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
    return <SmallButton icon={icon} onClickFunction={onClickFunction} />;
  }
  if (type === "add") {
    return (
      <MainButton
        CustomButtonContainer={AddingButtonIconContainer}
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
        CustomButtonContainer={ClickedPlainButtonIconContainer}
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
      />
    );
  }
  return (
    <div>
      <MainButton
        CustomButtonContainer={PlainButtonIconContainer}
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
