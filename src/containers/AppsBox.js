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
  team,
  params,
}) => {
  const [appIdToDisplay, setAppIdToDisplay] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(!appIdToDisplay && params.appId){
      setAppIdToDisplay(params.appId);
    }else {
      setAppIdToDisplay("");
    }
  }, []);

  const clickingToHere = () => {
    setAppIdToDisplay("");
  };
  const setAppToDisplay = (singleApp) => {
    setAppIdToDisplay(singleApp.id);
    if(!params.appId){
      const existingParams = Object.fromEntries([...searchParams]);
      setSearchParams({...existingParams, appId: singleApp.id}) 
    }
  }
  return (
    <DepartmAppsBoxContainer>
      <div>
        <StyledButton onClick={clickingToHere}>
          <DepAppBoxPageTitle>
            {useCapitaliseFirstLetter(team)}
          </DepAppBoxPageTitle>
        </StyledButton>
      </div>
      <>
        {teamApps &&
          !appIdToDisplay &&
          teamApps.map((singleApp) => {
            console.log("singleApp", singleApp);
            return (
              <div onClick={() => setAppToDisplay(singleApp)}>
                <ButtonIcon app={singleApp.name} />
              </div>
            );
          })}
      </>

      {appIdToDisplay && <AppPage appIdToDisplay={appIdToDisplay} />}
    </DepartmAppsBoxContainer>
  );
};

export default AppsBox;

// take depApps and use them to pupulate the buttons
// on click of the button bring the app
// what will happen if the user goes back ? will the app be deleted from state?
// is it better to have many small calls or fewer biger ones?
