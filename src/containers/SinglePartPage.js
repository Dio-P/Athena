import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import DocIcon from "../components/DocIcon";
import useIconCounter from '../hooks/useIconCounter';

const PartPageContainer = styled.div`
    display: flex;
    flex-direction: column;
  `;

const SinglePartPage = () => {
  const {
    name, 
    type, 
    ghRepo, 
    folderToBeDisplayedIn,
    docs
  } = useLocation().state;

  // let iconNu = useRef(0)
  let iconNu = 0

  return (
    <PartPageContainer>
      {docs.map((doc)=> {
        // iconNu.current = iconNu.current +1
        iconNu ++
        return <DocIcon 
          doc={doc}
          // iconNu={iconNu.current}
          iconNu={iconNu}
        />
      })}
    </PartPageContainer>
  )
}

export default SinglePartPage;