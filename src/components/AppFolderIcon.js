import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const AppFolderIcon = ({ app }) => {
  const [thisApp, setThisApp] = useState({name: "optimo", test: "testing"})

  // useEffect(()=>{
  //   setThisApp(app)
  // }, [app])

  // useEffect(()=>{
  //   console.log("thisApp", thisApp);
  // }, [thisApp])
  const AppFolderIconContainer = styled.div`
    display: flex;
    align-content: center;
    background-color: #6c98e0;
    width: 115px;
    height: 50px;
    box-shadow: #2b2a28 0.5em 0.5em 0.3em;
    border-radius: 15px 10%;
    margin: 20px;
    font-size: 18px;

    `;

  const DecoratedLink = styled(Link)`
    margin: auto;
    color: #FFFFFF;
    text-decoration: none;


  `;

  const AppFolderButton = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
   
  `;

  return(
      <AppFolderIconContainer>
        <DecoratedLink
        to={`/appPage/:${thisApp.name}`}
        state={{...thisApp}}>
          <AppFolderButton> 
            {useCapitaliseFirstLetter(thisApp.name)}
          </AppFolderButton>
        </DecoratedLink>
      </AppFolderIconContainer>
  ) 
}

export default AppFolderIcon