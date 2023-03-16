import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";

const AppInputContainer = styled.div`
  height: 100%;
  background-color: #fffcfa;
  margin: 20px 40px 20px 20px;
  border-radius: ${styleVariables.borderRadious.secondary};
`;

const SingleInputCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
  width: 200px;
`;

const ManageAppDetails = ({ appName, appType, appHgRepo, appBriefDescr, updatedApp, setUpdatedApp }) => {
  
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [newGhRepo, setNewGhRepo] = useState("");
  const [newBriefDescr, setNewBriefDescr] = useState("");

  useEffect(() => {
    setUpdatedApp({
      ...updatedApp,
      name: newName || appName,
      type: newType || appType,
      ghRepo: newGhRepo || appHgRepo,
      briefDescr: newBriefDescr || appBriefDescr,
    })

  }, [newName, newType, newGhRepo, newBriefDescr])

  return (
    <AppInputContainer>
      <SingleInputCont>
        <label>Name</label>
        <input
          name="appName"
          placeholder={appName}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </SingleInputCont>
      <SingleInputCont>
        <label>Type</label>
        <input
          name="appType"
          placeholder={appType}
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
      </SingleInputCont>
      <SingleInputCont>
        <label>GH Repo</label>
        <input
          name="appHgRepo"
          placeholder={appHgRepo}
          value={newGhRepo}
          onChange={(e) => setNewGhRepo(e.target.value)}
        />
      </SingleInputCont>
      <SingleInputCont>
        <label>Brief Description</label>
        <input
          name="appBriefDescr"
          placeholder={appBriefDescr}
          value={newBriefDescr}
          onChange={(e) => setNewBriefDescr(e.target.value)}
        />
      </SingleInputCont>
    </AppInputContainer>
  );
};

export default ManageAppDetails;
