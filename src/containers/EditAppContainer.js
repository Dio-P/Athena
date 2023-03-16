import { useEffect, useState } from "react";
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
  const [updatedApp, setUpdatedApp] = useState(app);
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
          appName={app.name}
          appType={app.type}
          appHgRepo={app.gitHubRepo}
          appBriefDescr={app.briefDescr}
          updatedApp={updatedApp}
          setUpdatedApp={setUpdatedApp}
        />
        <ManageFoldersDetails
          updatedApp={updatedApp}
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
