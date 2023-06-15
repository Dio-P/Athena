import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";

const DeleteComponentContainer = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  flex-direction: column;
  margin: 10px;
`;

const WarningBody = styled.div`
  color: black;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const Delete = ({ isPopUpOpen, data }) => {

  return (
    <DeleteComponentContainer>
      <WarningBody>
        {`You are about to delete ${data}. Are you really, really sure that that's what you want?`}
      </WarningBody>
      <ButtonsContainer>
        <GenericButtonIcon
          label="Yes"
          type="add"
        />
        <GenericButtonIcon
          label="No"
          type="add"
        />
      </ButtonsContainer>
    </DeleteComponentContainer>
  )
}

export default Delete;