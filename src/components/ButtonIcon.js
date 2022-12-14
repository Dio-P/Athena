import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const DecoratedLink = styled(Link)`
display: flex;
color: #FFFFFF;
text-decoration: none;
margin: auto;
`;

const ClickedAppButtonIconContainer = styled.div`
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

const AppButtonIconContainer = styled.div`
display: flex;
align-content: center;
background-color: #1D4587;
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

const AppFolderButton = styled.button`
margin: auto;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;

`;

const ButtonIcon = ({ app, department, folder, part, clicked, addingButton, buttonTitle }) => {
  const [thisTeam, setThisTeam] = useState("");
  const [thisApp, setThisApp] = useState("");
  const [thisClicked, setThisClicked] = useState(false);
  const [thisAddingButton, setThisAddingButton] = useState(false);
  const [thisFolder, setThisFolder] = useState("");
  const [thisPart, setThisPart] = useState("");

  useEffect(() => {
    setThisTeam(department) 
  }, [department]);
  // useEffect(() => {
  //   console.log("buttonTitle!!!", buttonTitle)
  // }, [buttonTitle]);
  // useEffect(() => {
  //   console.log("folder!!!", folder)
  // }, [folder]);

  useEffect(() => {
    setThisApp(app);
  }, [app]);
  // useEffect(() => {
  //   setThisFolder(folder)
  // }, [folder]);

  useEffect(() => {
      setThisClicked(clicked)
  }, [clicked]);

  useEffect(() => {
    setThisAddingButton(addingButton)
  }, [addingButton]);

  const defineName = () => {
    if(!thisApp&& thisTeam && !folder && !part && !buttonTitle) {
      return thisTeam.name
    }
    if(thisApp && !thisTeam && !folder && !part && !buttonTitle) {
      return thisApp
    }
    if(!thisApp && !thisTeam && folder && !part && !buttonTitle) {
      return folder
    }
    if(!thisApp && !thisTeam && !folder && part && !buttonTitle) {
      return part
    }
    if(!thisApp && !thisTeam && !folder && !part && buttonTitle) {
      return buttonTitle
    }
    return undefined;
  }

  const CustomButtonContainer = thisClicked? ClickedAppButtonIconContainer: thisAddingButton? AddingButtonIconContainer : AppButtonIconContainer;
  // const CustomButtonContainer = thisClicked? ClickedAppButtonIconContainer: AppButtonIconContainer;

  return(
      <DecoratedLink>
        <CustomButtonContainer>
          <AppFolderButton> 
            {useCapitaliseFirstLetter(defineName())}
          </AppFolderButton>
        </CustomButtonContainer>
      </DecoratedLink>
  ) 
}

export default ButtonIcon