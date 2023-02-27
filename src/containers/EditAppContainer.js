import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { deleteIcon } from "../helpers/svgIcons";
import ManageAppInput from "./ManageAppInput";

const EditAppContainerWrapper = styled.div``;

const Body = styled.div``;

const EditAppContainer = ({ ComponentToDisplay, setIsPopUpOpen }) => {
  return (
    <EditAppContainerWrapper>
      <GenericButtonIcon
        onClickFunction={() => setIsPopUpOpen(false)}
        type="small"
        icon={deleteIcon}
      />
      <Body>
        <ManageAppInput appName={"test"} appType={"test"} appHgRepo={"test"} appBriefDescr={"test"} />
      </Body>
    </EditAppContainerWrapper>
  );
};

export default EditAppContainer;
