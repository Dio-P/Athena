import OverlayElem from "./OverlayElem";
import styled from "@emotion/styled";
import AddNewFolderInputContainer from "../containers/AddNewFolderInputContainer";

const PopUpContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PopUpWrapper = styled.div`
  z-index: 101;
  position: absolute;
  width: auto;
  margin-left: -200px;
  left: 50%;
  margin-bottom: -200px;
  bottom: 50%;
`;

const PopUp = ({
  ComponentToDisplay,
  setIsPopUpOpen,
  folderOfNewPart,
  onClickFunction,
  folderBeenCreated,
  setFolderBeenCreated,
  app,
}) => {
  return (
    <PopUpContainer>
      <OverlayElem />
      <PopUpWrapper>
        <ComponentToDisplay
          setIsPopUpOpen={setIsPopUpOpen}
          folderOfNewPart={folderOfNewPart}
          onClickFunction={onClickFunction}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
          app={app}
        />
      </PopUpWrapper>
    </PopUpContainer>
  );
};

export default PopUp;
