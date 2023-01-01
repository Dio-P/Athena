import { useEffect, useState } from "react";
import ButtonIcon from "../components/ButtonIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import SingleAppPage from "./SingleAppPage";
import styled from "@emotion/styled";
import useAppByIdSearch from "../hooks/queries/useAppByIdSearch";

const DepartmAppsBoxContainer = styled.div`
margin-left: 10px;
color: orange;
`;

const DepAppBoxPageTitle = styled.h2`
margin: 0px;
`;

const StyledButton = styled.button`
margin: auto;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
`;

const AppsBox = ({ department, teamApps, team }) => {
  const [returnToThisPage, setReturnToThisPage] = useState(false);
  const [appToDisplay, setAppToDisplay] = useState("");

  useEffect(() => {
    setAppToDisplay(""); 

  }, [])

  const clickingToHere = () => {
    setAppToDisplay(""); 
  }

  return (
    <DepartmAppsBoxContainer>
      <div>
        <StyledButton onClick={clickingToHere} >
          <DepAppBoxPageTitle>
            { useCapitaliseFirstLetter(team) }
          </DepAppBoxPageTitle>
        </StyledButton>
      </div>
      <>
        {(teamApps && !appToDisplay)
        &&
        teamApps.map((app) => {
            return (
              <StyledButton onClick={() => setAppToDisplay(app)} >
                <ButtonIcon app={ app.name }/>
              </StyledButton>
            )
        })}
      </>

      {appToDisplay
      &&
        <SingleAppPage app={appToDisplay}/>
      }

    </DepartmAppsBoxContainer>
  )
}

export default AppsBox;

// take depApps and use them to pupulate the buttons
// on click of the button bring the app
  // what will happen if the user goes back ? will the app be deleted from state?
  // is it better to have many small calls or fewer biger ones?