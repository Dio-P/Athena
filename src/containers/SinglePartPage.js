import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import DocIcon from "../components/DocIcon";
import useIconCounter from '../hooks/useIconCounter';

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

  const [iconCount, setIconCount] = useState(0);
  let count = -1

  return (
    <PartPageContainer>
      {docs.map((doc)=> {
        count ++
        return <DocIcon 
          doc={doc}
          iconNu={count}
        />
      })}
    </PartPageContainer>
  )
}

export default SinglePartPage;