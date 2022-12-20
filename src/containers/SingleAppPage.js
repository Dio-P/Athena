import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import useCapitaliseFirstLetter from '../hooks/useCapitaliseFirstLetter';
import AddNewConnectionBox from '../components/AddNewConnectionBox';
import PartIcon from '../components/PartIcon';
import ButtonIcon from '../components/ButtonIcon';
import FolderContainer from './FolderContainer';
import Folder from '../components/Folder';

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
    if(app){
      setThisApp({
        ...app,
        folders: updateFolders(app),
        parts: updateParts()
      })
    }
  }, [app])

  // useEffect(()=>{
  //   console.log("thisApp", thisApp);

  // },[thisApp])

  const putPartIdToUpdatedFolder = (folderId) => {
    const folderParts = app.parts.filter((part) => (
      part.folderToBeDisplayedIn===folderId
    ))
    // const partIdsArray = folderParts.map((part)=>(part.id))
    // return partIdsArray;
    return folderParts;
  }

  const updateFolders = (app) => {
    const updatedFolders = app.folders.map((folder)=>(
      {...folder, parts:putPartIdToUpdatedFolder(`${folder.id}`)}
    ))
    return updatedFolders
  };

  const findPartsDocs = (id) => {
    const appDocs = app.docs.filter((doc)=>(
      doc.concerningParts.includes(id)
    ));
    console.log("appDocs", appDocs);
    // const appDocsIds = appDocs.map((doc)=>(
    //   doc.id
    // ))
    return appDocs
  }

  const updateParts = () => {
    const updatedParts = app.parts.map((part)=>(
      {...part, docs: findPartsDocs(`${part.id}`)}
    ))
    return updatedParts;
  }

  const clickingToAddNewConnection = () => {
    setAddNewConnectionBoxIsOpen(true)
  }

  return (
    <AppPageContainer>
      <AppPageTitle>
        { useCapitaliseFirstLetter(app.name) }
      </AppPageTitle>

      {thisApp &&
        thisApp.folders.map((folder) => (
          <Folder
            folderName={ folder.title } 
            parts={ folder.parts }
          />
        ))
      }
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
// logic updating docs in parts with id array

// add folder section logic
// finish with the Part Icon logic and put everything inside the right folder
// have the folders as page sections but with a way to go there trought a catalog or something
// add filtering options for part icons
// make form popuble on the same page
// from the part make clickable only the title and the link, not the entire button 