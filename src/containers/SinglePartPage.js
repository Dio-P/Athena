import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import DocIcon from "../components/DocIcon";
import { useEffect } from 'react';

const PartPageContainer = styled.div`
    display: flex
  `;

const SinglePartPage = () => {
  const {
    name, 
    type, 
    ghRepo, 
    folderToBeDisplayedIn,
    docs
    } = useLocation().state;
  
  return (
    <PartPageContainer>
      {docs.map((doc)=> (
        <DocIcon doc={doc}/>
      ))}
    </PartPageContainer>
  )
}

export default SinglePartPage;