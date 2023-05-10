import OverlayElem from "./OverlayElem";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import GenericButtonIcon from "./GenericButtonIcon";
import { deleteIcon } from "../helpers/svgIcons";

const PopUpContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// the bellow height needs to change when I find a best way to make this iteractive
const PopUpWrapper = styled.div`
  z-index: 101;
  position: absolute;
  width: auto;
  height: 90%;
  margin-left: -200px;
  left: 50%;
  margin-bottom: -300px;
  bottom: 50%;
`;

const EditAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${styleVariables.colours.primaryLight};
`;

const PopUp = ({
  ComponentToDisplay,
  setIsPopUpOpen,
  folderOfNewPart,
  onClickFunction,
  folderBeenCreated,
  setFolderBeenCreated,
  app,
  part,
  folders,
}) => {
  return (
    
    <PopUpContainer>
      <OverlayElem />
      <PopUpWrapper>
      <EditAppWrapper>
      <GenericButtonIcon
        onClickFunction={() => setIsPopUpOpen(false)}
        type="small"
        icon={deleteIcon}
      />
        <ComponentToDisplay
          setIsPopUpOpen={setIsPopUpOpen}
          folderOfNewPart={folderOfNewPart}
          onClickFunction={onClickFunction}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
          app={app}
          part={part}
          folders={folders}
        />
        </EditAppWrapper>
      </PopUpWrapper>
    </PopUpContainer>
  );
};

export default PopUp;
