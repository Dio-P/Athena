import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ButtonIcon from "../components/ButtonIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import AppPage from "./AppPage";
import styled from "@emotion/styled";
import useAppByIdSearch from "../hooks/queries/useAppByIdSearch";
import { v4 as uuidv4 } from "uuid";
import useValuesFromUrlParams from "../hooks/useValuesFromUrlParams";

const mockPartId1 = uuidv4();
const mockPartId2 = uuidv4();

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
  department,
  teamApps,
  team,
  params,
}) => {
  const [returnToThisPage, setReturnToThisPage] = useState(false);
  const [appIdToDisplay, setAppIdToDisplay] = useState("");
  const [app, setApp] = useState(undefined);
  let [searchParams, setSearchParams] = useSearchParams();
  // const appIdUrlParam = useMemo(() => {
  //   console.log("searchParams.get('appId')", searchParams.get('appId'));
  //   return searchParams.get('appId');
  // }, [searchParams?.get('appId')!==undefined]);
  // const appIdUrlParam = searchParams.get('appId');
  // const [teamParam, appIdParam] = useValuesFromUrlParams()

  useEffect(() => {
    console.log("appBoxParam!!", params);
    if(!appIdToDisplay && params.appId){
      // console.log("setting params to appIdUrlParam");
      setAppIdToDisplay(params.appId);
    }else {
      // console.log("setting app id to empty string ");
      setAppIdToDisplay("");
    }
  }, []);

  // useEffect(() => {
  //   console.log("params#@#@##@", teamParam, appIdParam);
  
  // }, [teamParam, appIdParam]);

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
