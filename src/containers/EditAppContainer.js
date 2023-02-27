import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { deleteIcon } from "../helpers/svgIcons";
import ManageAppInput from "../components/ManageAppInput";
import ManageFoldersInput from "../components/ManageFoldersInput";

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
        <ManageAppInput
          appName={"test"}
          appType={"test"}
          appHgRepo={"test"}
          appBriefDescr={"test"}
        />
        <ManageFoldersInput folders={folders}/>
      </Body>
    </EditAppContainerWrapper>
  );
};

export default EditAppContainer;
