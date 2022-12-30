import { useEffect, useState } from "react";
import ButtonIcon from "../components/ButtonIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import SingleAppPage from "./SingleAppPage";
import styled from "@emotion/styled";

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

const DepAllAppsBox = ({ department, depApps }) => {
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
            { useCapitaliseFirstLetter(department.name) }
          </DepAppBoxPageTitle>
        </StyledButton>
      </div>
      <>
        {(department.apps && !appToDisplay)
        &&
          department.apps.map((app) => {
            return (
              <StyledButton onClick={() => setAppToDisplay(app)} >
                <ButtonIcon app={ app }/>
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

export default DepAllAppsBox