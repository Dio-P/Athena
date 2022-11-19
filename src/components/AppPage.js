import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import useCapitaliseFirstLetter from '../hooks/useCapitaliseFirstLetter';

const AppPage = ({ app }) => {
  // const location = useLocation();
  // const app = location.state;

  const [thisApp, setThisApp] = useState("");

  const AppPageContainer = styled.div`
    margin-left: 10px;
  `;

  const AppPageTitle = styled.h1`
    margin: 0px;
  `;

  useEffect(()=>{
    setThisApp(app)
  }, [app])

  // useEffect(()=>{
  //   console.log("thisApp", thisApp);
  // }, [thisApp])

  return (
    <AppPageContainer>
      <AppPageTitle>
        { useCapitaliseFirstLetter(app.name) }
      </AppPageTitle>
    </AppPageContainer>
  )
}

export default AppPage;