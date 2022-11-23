import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import useCapitaliseFirstLetter from '../hooks/useCapitaliseFirstLetter';
import AddNewConnectionBox from './AddNewConnectionBox';

const AppPageContainer = styled.div`
margin-left: 10px;
`;

const AppPageTitle = styled.h1`
margin: 0px;
`;

const AddDocButton = styled.button`
margin: auto;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
`;

const AppPage = ({ app }) => {
  // const location = useLocation();
  // const app = location.state;

  const [thisApp, setThisApp] = useState("");
  const [addNewConnectionBoxIsOpen, setAddNewConnectionBoxIsOpen] = useState(false)

  useEffect(()=>{
    setThisApp(app)
  }, [app])

  const clickingToAddNewConnection = () => {
    setAddNewConnectionBoxIsOpen(true)
  }

  // useEffect(()=>{
  //   console.log("thisApp", thisApp);
  // }, [thisApp])

  return (
    <AppPageContainer>
      <AppPageTitle>
        { useCapitaliseFirstLetter(app.name) }
      </AppPageTitle>
      <AddDocButton onClick={clickingToAddNewConnection}>
        + Add URL
      </AddDocButton>
      {addNewConnectionBoxIsOpen
      &&
        <AddNewConnectionBox app={ app } />
      }
    </AppPageContainer>
  )
}

export default AppPage;