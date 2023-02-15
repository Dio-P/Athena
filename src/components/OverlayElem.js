import styled from "@emotion/styled";

const Overlay = styled.div`
  opacity: 0.9;
  background-color: #686B6E;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  position: fixed;

`;
// ${props => !props.hidden ? showOverlayStyle : null}
// ${props => props.loading ? loadingStyle : null}

const OverlayElem = () => {
  // const handleClick = event => {
  //   event.preventDefault();
  //   onClick(event);
  // };

  return (
    <Overlay
    // onClick={handleClick}
    >

    </Overlay>

  ) 
}

export default OverlayElem;