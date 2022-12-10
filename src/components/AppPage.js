import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import useCapitaliseFirstLetter from '../hooks/useCapitaliseFirstLetter';
import AddNewConnectionBox from './AddNewConnectionBox';
import PartIcon from './PartIcon';
import FolderIcon from './FolderIcon';

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

const PartsContainer = styled.div`
  display: flex,
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
      <>
      <h3> Client</h3>
        {app.parts.map((part) => (
          <PartIcon part={part}/>
        ))}
      </>
      <>
      <h3> Server</h3>
        {app.parts.map((part) => (
          <PartIcon part={part}/>
        ))}
      </>
      <AddDocButton onClick={clickingToAddNewConnection}>
        <FolderIcon   
            addingButton={true}
            buttonTitle="+ Add URL"
        />
        
      </AddDocButton>
      {addNewConnectionBoxIsOpen
      &&
        <AddNewConnectionBox app={ app } />
      }
    </AppPageContainer>
  )
}

export default AppPage;

// add folder section logic
// finish with the Part Icon logic and put everything inside the right folder
// have the folders as page sections but with a way to go there trought a catalog or something
// add filtering options for part icons
// make form popuble on the same page