import { useSearchParams } from "react-router-dom";
import GenericButtonIcon from "../components/GenericButtonIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import useParamsHelper from "../hooks/useParamsHelper";
import AppPage from "./AppPage";
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

const AppsBox = ({ teamApps, teamName }) => {
  const { 
    setAppToDisplay, 
    params: {
      appId
    } 
  } = useParamsHelper();

  return (
    <DepartmAppsBoxContainer>
      <div>
        <StyledButton onClick={setAppToDisplay}>
          <DepAppBoxPageTitle>
            {useCapitaliseFirstLetter(teamName)}
          </DepAppBoxPageTitle>
        </StyledButton>
      </div>
      <>
        {teamApps &&
          !appId &&
          teamApps.map((singleApp) => {
            return (
              <div onClick={() => setAppToDisplay(singleApp)}>
                <GenericButtonIcon label={singleApp.name} />
              </div>
            );
          })}
      </>

      {appId && <AppPage appIdToDisplay={appId} />}
    </DepartmAppsBoxContainer>
  );
};

export default AppsBox;
