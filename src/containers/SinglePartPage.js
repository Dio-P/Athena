import styled from "@emotion/styled";
import DocIcon from "../components/DocIcon";

const SinglePartPage = ({ part }) => {
  const PartPageContainer = styled.div`
    display: flex
  `;
  return (
    <PartPageContainer>
      <p>part page</p>
      {/* {part.docs.map((doc)=> (
        <DocIcon doc={doc}/>
      ))} */}
    </PartPageContainer>
  )
}

export default SinglePartPage;