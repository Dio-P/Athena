import styled from "@emotion/styled";
import { useState } from "react";
import styleVariables from "../styleVariables";

const AppInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fffcfa;
  border-radius: ${styleVariables.borderRadious.secondary};
`;

const ManageAppInput = ({appName, appType, appHgRepo, appBriefDescr}) => {
  const [app, setApp] = useState({
      name: "",
      type: "",
      ghRepo: "",
      briefDescr: "",
    })

  return (
    <AppInputContainer>
      <label>Name</label>
      <input name="appName" value={appName}  onChange={(e) => setApp({ ...app, name: e.target.value})}/>

      <label>Type</label>
      <input name="appType" value={appType}  onChange={(e) => setApp({ ...app, type: e.target.value})}/>

      <label>GH Repo</label>
      <input name="appHgRepo" value={appHgRepo}  onChange={(e) => setApp({ ...app, ghRepo: e.target.value})}/>

      <label>Brief Description</label>
      <input name="appBriefDescr" value={appBriefDescr}  onChange={(e) => setApp({ ...app, briefDescr: e.target.value})}/>

    </AppInputContainer>

  ) 
}

export default ManageAppInput;