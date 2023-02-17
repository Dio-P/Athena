import OverlayElem from "./OverlayElem";
import styled from "@emotion/styled";
import AddNewFolderInputContainer from "../containers/AddNewFolderInputContainer";

const NewFolderPopUpWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const NewFolderInputContainerWrapper = styled.div`
  z-index: 101;
  position: absolute;
  width: auto;
  margin-left: -200px;
  left: 50%;
  margin-bottom: -200px;
  bottom: 50%;
`;

const NewFolderPopUp = ({
  setIsNewFolderPopUpOpen,
  folderOfNewPart,
  onClickFunction,
  folderBeenCreated,
  setFolderBeenCreated,
}) => {
  return (
    <NewFolderPopUpWrapper>
      <OverlayElem />
      <NewFolderInputContainerWrapper>
        <AddNewFolderInputContainer
          setIsNewFolderPopUpOpen={setIsNewFolderPopUpOpen}
          folderOfNewPart={folderOfNewPart}
          onClickFunction={onClickFunction}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
        />
      </NewFolderInputContainerWrapper>
    </NewFolderPopUpWrapper>
  );
};

export default NewFolderPopUp;
