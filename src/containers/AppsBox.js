import { useSearchParams } from "react-router-dom";
import GenericButtonIcon from "../components/GenericButtonIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
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

const AppsBox = ({
  teamApps,
  teamName,
  params,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const {team, appId} = Object.fromEntries([...searchParams]);

  const setAppToDisplay = (singleApp) => {
    if(!appId){
      const existingParams = Object.fromEntries([...searchParams]);
      setSearchParams({...existingParams, appId: singleApp.id}) 
    }
  }
  return (
    <DepartmAppsBoxContainer>
      <div>
        <StyledButton onClick={() => setSearchParams({team})}>
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

      {appId && <AppPage 
        appIdToDisplay={appId}
        params={params} //does this still need to be passed?
      />}
    </DepartmAppsBoxContainer>
  );
};

export default AppsBox;
