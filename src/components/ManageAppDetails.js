import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";

const AppInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fffcfa;
  border-radius: ${styleVariables.borderRadious.secondary};
`;

const ManageAppDetails = ({ appName, appType, appHgRepo, appBriefDescr }) => {
  const [app, setApp] = useState(undefined);

  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [newGhRepo, setNewGhRepo] = useState("");
  const [newBriefDescr, setNewBriefDescr] = useState("");

  useEffect(() => {
    setApp({
      name: newName || appName,
      type: newType || appType,
      ghRepo: newGhRepo || appHgRepo,
      briefDescr: newBriefDescr || appBriefDescr,
    })

  }, [newName, newType, newGhRepo, newBriefDescr])

  useEffect(() => {
    console.log("app", app);
  }, [app])

  return (
    <AppInputContainer>
      <label>Name</label>
      <input
        name="appName"
        placeholder={appName}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <label>Type</label>
      <input
        name="appType"
        placeholder={appType}
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
      />

      <label>GH Repo</label>
      <input
        name="appHgRepo"
        placeholder={appHgRepo}
        value={newGhRepo}
        onChange={(e) => setNewGhRepo(e.target.value)}
      />

      <label>Brief Description</label>
      <input
        name="appBriefDescr"
        placeholder={appBriefDescr}
        value={newBriefDescr}
        onChange={(e) => setNewBriefDescr(e.target.value)}
      />
    </AppInputContainer>
  );
};

export default ManageAppDetails;
