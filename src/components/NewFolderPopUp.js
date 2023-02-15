import OverlayElem from "./OverlayElem";
import styled from "@emotion/styled";

const OverlayWrapper = styled.div`
  width: 100%;
  height: 100%
`;

const NewFolderPopUp = () => {
  return (
    <OverlayWrapper>
      <OverlayElem/>
    </OverlayWrapper>

  ) 
};

export default NewFolderPopUp;