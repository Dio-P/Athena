import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import useCapitaliseFirstLetter from '../hooks/useCapitaliseFirstLetter';
import AddNewConnectionBox from './AddNewConnectionBox';
import PartIcon from './PartIcon';
import ButtonIcon from './ButtonIcon';
import FolderContainer from '../containers/FolderContainer';
import Folder from './Folder';

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

  useEffect(()=>{
    if(thisApp){
      setThisApp(partsToFolders(thisApp))
    }
  }, [thisApp])

  const partsToFolders = (app) => {
    app.folders.map((folder)=>(
      {...folder, parts:[]}
    ))
    return 
  }

  const clickingToAddNewConnection = () => {
    setAddNewConnectionBoxIsOpen(true)
  }

  // useEffect(()=>{
  //   console.log("thisApp", thisApp);
  // }, [thisApp])

  // login which will distribute parts acording to filter

  return (
    <AppPageContainer>
      <AppPageTitle>
        { useCapitaliseFirstLetter(app.name) }
      </AppPageTitle>
      {/* { Object.values(app.folders).map((folder) => (
        <FolderContainer folder={folder} />
      )) } */}

      
      {/* <>
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
      </> */}
      <AddDocButton onClick={clickingToAddNewConnection}>
        <ButtonIcon   
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

// working:
// logic which will destribute parts per folder

// add folder section logic
// finish with the Part Icon logic and put everything inside the right folder
// have the folders as page sections but with a way to go there trought a catalog or something
// add filtering options for part icons
// make form popuble on the same page
// from the part make clickable only the title and the link, not the entire button 