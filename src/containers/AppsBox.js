import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ButtonIcon from "../components/ButtonIcon";
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
                <ButtonIcon app={singleApp.name} />
              </div>
            );
          })}
      </>

      {appId && <AppPage 
        appIdToDisplay={appId}
        params={params}
      />}
    </DepartmAppsBoxContainer>
  );
};

export default AppsBox;

// take depApps and use them to pupulate the buttons
// on click of the button bring the app
// what will happen if the user goes back ? will the app be deleted from state?
// is it better to have many small calls or fewer biger ones?
