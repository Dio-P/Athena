import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
  let {
    appName,
    partId
  } = useParams();


  // let iconNu = useRef(0)
  let iconNu = 0;

  useEffect(() => {
    console.log("hello from Single Part Page");
    console.log("appName,partName", appName,
    partId);
  }, [])
  

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

// the plan now is to get what you need from here in the first place (make the call)
// and up until then just move about id id's