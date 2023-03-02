import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { deleteIcon } from "../helpers/svgIcons";
import ManageAppDetails from "../components/ManageAppDetails";
import ManageFoldersDetails from "../components/ManageFoldersDetails";

const EditAppContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
