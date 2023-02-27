import styled from "@emotion/styled";
import { useState } from "react";

const AppInputContainer = styled.div`
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