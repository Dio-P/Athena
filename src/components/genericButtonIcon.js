import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import styleVariables from "../styleVariables";

const ButtonAndTickBoxWrapper = styled.div`
  display: flex;
  width: 120%;
  max-width: 14em;
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
`;

const SmallButtonIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 35px;
  height: 25px;
  margin: auto;
  cursor: pointer;
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

const Tick = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-label="confirm icon"
    // class="css-1n8p6mz"
  >
    <path
      fill="#1ee685"
      d="M32 7.2l-2.5-2.4L11 23.3h2L2.4 12.6 0 15.1l12 12.1 20-20z"
    ></path>
  </svg>
);

const SmallButton = ({ icon, onClickFunction }) => {
  return (
    <SmallButtonWrapper onClick={onClickFunction}>
      <SmallButtonIconContainer>{icon}</SmallButtonIconContainer>
    </SmallButtonWrapper>
  );
};

const MainButton = ({ CustomButtonContainer, type, label, clicked, onClickFunction }) => {
  return (
    <ButtonAndTickBoxWrapper onClick={onClickFunction}>
      <WholeButtonWrapper>
        <CustomButtonContainer>
          <BtnLabelContainer>
            <BtnLabel>{capitaliseFirstLetters(label)}</BtnLabel>
          </BtnLabelContainer>
          {type !== "add" && (
            <TickBoxWrapper>
              <TickBox>{clicked && <Tick />}</TickBox>
            </TickBoxWrapper>
          )}
        </CustomButtonContainer>
      </WholeButtonWrapper>
    </ButtonAndTickBoxWrapper>
  );
};

const GenericButtonIcon = ({ label, clicked, type, icon, onClickFunction }) => {
  if (type === "small") {
    return <SmallButton icon={icon} onClickFunction={onClickFunction}/>;
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
  if (!!clicked) {
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
  return (
    <MainButton
      CustomButtonContainer={PlainButtonIconContainer}
      type={type}
      label={label}
      clicked={clicked}
      onClickFunction={onClickFunction}
    />
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
