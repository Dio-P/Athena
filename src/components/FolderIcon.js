import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const DecoratedLink = styled(Link)`
display: flex;
color: #FFFFFF;
text-decoration: none;
margin: auto;
`;

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

const AppFolderButton = styled.button`
margin: auto;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;

`;

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
    console.log("inside defineLink");
    if(thisDepartment && !thisApp) {
      console.log("inside defineLink thisDepartment true");
      return ""
    }
    if(thisApp && !thisDepartment) {
      console.log("inside defineLink, thisApp true");
      return `/appPage/:${thisApp.name}`
    }
    return ""
  };

  const defineName = () => {
    if(thisDepartment && !thisApp) {
      return thisDepartment.name
    }
    if(thisApp && !thisDepartment) {
      return thisApp.name
    }
    return "..."
  }

  return(
      <DecoratedLink>
      {/* to={()=>defineLink()}
      state={{...thisApp}}> */}
        <AppFolderIconContainer>
          <AppFolderButton> 
            {useCapitaliseFirstLetter(defineName())}
          </AppFolderButton>
        </AppFolderIconContainer>
      </DecoratedLink>
  ) 
}

export default AppFolderIcon