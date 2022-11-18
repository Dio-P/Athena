import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const AppFolderIcon = ({ app, department }) => {
  const [thisDepartment, setThisDepartment] = useState();
  const [thisApp, setThisApp] = useState("");

  useEffect(() => {
    console.log("department", department);
    setThisDepartment(department) 
  }, [department]);

  useEffect(() => {
    setThisApp(app) 
  }, [app]);

  const defineLink = () => {
    if(thisDepartment) {
      return ""
    }
    if(thisApp) {
      return `/appPage/:${thisApp.name}`
    }
    return ""
  };

  const defineName = () => {
    if(thisDepartment && !thisApp) {
      console.log("inside if thisDepartment true");
      return thisDepartment.name
    }
    if(thisApp && !thisDepartment) {
      console.log("inside if this app true");
      return thisApp.name
    }
    return "..."
  }

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
        to={defineLink}
        state={{...thisApp}}>
          <AppFolderButton> 
            {useCapitaliseFirstLetter(defineName())}
          </AppFolderButton>
        </DecoratedLink>
      </AppFolderIconContainer>
  ) 
}

export default AppFolderIcon