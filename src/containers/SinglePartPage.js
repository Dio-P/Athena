import styled from "@emotion/styled";
import DocIcon from "../components/DocIcon";

const SinglePartPage = ({ 
  name, 
  type, 
  ghRepo, 
  folderToBeDisplayedIn,
  docs
}) => {
  const PartPageContainer = styled.div`
    display: flex
  `;
  return (
    <PartPageContainer>
      {docs.map((doc)=> (
        <DocIcon doc={doc}/>
      ))}
    </PartPageContainer>
  )
}

export default SinglePartPage;