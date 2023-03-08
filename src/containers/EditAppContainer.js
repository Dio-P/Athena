import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { deleteIcon } from "../helpers/svgIcons";
import ManageAppDetails from "../components/ManageAppDetails";
import ManageFoldersDetails from "../components/ManageFoldersDetails";
import styleVariables from '../styleVariables';

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

const EditAppContainer = ({ setIsPopUpOpen, folders }) => {
  return (
    <EditAppContainerWrapper>
      <GenericButtonIcon
        onClickFunction={() => setIsPopUpOpen(false)}
        type="small"
        icon={deleteIcon}
      />
      <Body>
        <ManageAppDetails
          appName={"test"}
          appType={"test"}
          appHgRepo={"test"}
          appBriefDescr={"test"}
        />
        <ManageFoldersDetails folders={folders}/>
      </Body>
    </EditAppContainerWrapper>
  );
};

export default EditAppContainer;
