import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { deleteIcon } from "../helpers/svgIcons";
import ManageAppDetails from "../components/ManageAppDetails";
import ManageFoldersDetails from "../components/ManageFoldersDetails";
import styleVariables from "../styleVariables";

const EditAppContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${styleVariables.colours.primaryLight};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: start;
`;

const EditAppContainer = ({ setIsPopUpOpen, app }) => {
  const initialApp = useMemo(() => app, [app])
  const [updatedApp, setUpdatedApp] = useState(undefined);
  // pass the whole app in here /\
  useEffect(() => {
    console.log("updatedApp", updatedApp);
  }, [updatedApp]);

  // useEffect(() => {
  //   setUpdatedApp(app)
  // }, [app]);

  const saveChanges = () => {};

  return (
    <EditAppContainerWrapper>
      <GenericButtonIcon
        onClickFunction={() => setIsPopUpOpen(false)}
        type="small"
        icon={deleteIcon}
      />
      <Body>
        <ManageAppDetails
          // appName={initialApp.name}
          // appType={initialApp.type}
          // appHgRepo={initialApp.gitHubRepo}
          // appBriefDescr={initialApp.briefDescr}
          app={initialApp}
          setUpdatedApp={setUpdatedApp}
        />
        <ManageFoldersDetails
          app={initialApp}
          setUpdatedApp={setUpdatedApp}
        />
      </Body>
      <GenericButtonIcon
        type="add"
        label="update details"
        onClickFunction={saveChanges}
      />
    </EditAppContainerWrapper>
  );
};

export default EditAppContainer;
