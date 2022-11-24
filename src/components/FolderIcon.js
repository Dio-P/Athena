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

const FolderIcon = ({ app, department, folder, part }) => {
  const [thisDepartment, setThisDepartment] = useState("");
  const [thisApp, setThisApp] = useState("");
  const [thisFolder, setThisFolder] = useState("")
  const [thisPart, setThisPart] = useState("")

  useEffect(() => {
    setThisDepartment(department) 
  }, [department]);

  useEffect(() => {
    setThisApp(app) 
  }, [app]);

  const defineName = () => {
    if(thisDepartment && !thisApp && !folder && !part) {
      return thisDepartment.name
    }
    if(thisApp && !thisDepartment && !folder && !part) {
      return thisApp.name
    }
    if(!thisApp && !thisDepartment && folder && !part) {
      console.log("folder!", folder);
      return folder
    }
    if(!thisApp && !thisDepartment && !folder && part) {
      console.log("part!", part);
      return part
    }
    return undefined;
  }

  return(
      <DecoratedLink>
        <AppFolderIconContainer>
          <AppFolderButton> 
            {useCapitaliseFirstLetter(defineName())}
          </AppFolderButton>
        </AppFolderIconContainer>
      </DecoratedLink>
  ) 
}

export default FolderIcon