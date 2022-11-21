import { useEffect, useState } from "react";
import FolderIcon from "../components/FolderIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import AppPage from "../components/AppPage";
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

const DepAllAppsBox = ({ department }) => {
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
                <FolderIcon app={ app }/>
              </StyledButton>
            )
        })}
      </>

      {appToDisplay
      &&
        <AppPage app={appToDisplay}/>
      }

    </DepartmAppsBoxContainer>
  )
}

export default DepAllAppsBox