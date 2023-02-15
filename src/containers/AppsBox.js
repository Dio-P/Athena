import PopulateButtonUnits from "./PopulateButtonUnits";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import useParamsHelper from "../hooks/useParamsHelper";
import AppPage from "./AppPage";
import styled from "@emotion/styled";
import { useEffect } from "react";

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

const AppsBox = ({ teamApps, teamName }) => {
  const { 
    manageAppIdParam, 
    params: {
      appId
    }
  } = useParamsHelper();

  useEffect(() => {
    console.log("AppsBox rendered");  
  }, [])

  return (
    <DepartmAppsBoxContainer>
      <StyledButton onClick={manageAppIdParam}>
        <DepAppBoxPageTitle>
          {capitaliseFirstLetters(teamName)}
        </DepAppBoxPageTitle>
      </StyledButton>

      {(teamApps &&
        !appId) &&
        <PopulateButtonUnits
          data={teamApps}
          onClickFunction={(singleApp) => manageAppIdParam(singleApp)}
        />
      }
      {appId && <AppPage appIdToDisplay={appId} />}
    </DepartmAppsBoxContainer>
  );
};

export default AppsBox;
