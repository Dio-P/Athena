import { useState, useEffect, useMemo } from "react";
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
  width: 250px;
  & label {
    margin-bottom: 5px;
  }
`;
const TeamsWarning = styled.div`
  font-size: 1.2em;
`;

const TextareaWrapper = styled.div`
  & textarea {
    width: 94%;
    height: 100px;
    overflow: scroll;
    padding: 6px;
  }
`;
const ManageAppDetails = ({ app, setUpdatedApp }) => {
  const appName = useMemo(() => app.name, [app]);
  const appType = useMemo(() => app.type, [app]);
  const appHgRepo = useMemo(() => app.gitHubRepo, [app]);
  const appTeams = useMemo(() => app.teams, [app]);
  const appBriefDescr = useMemo(() => app.briefDescr, [app]);

  const [newName, setNewName] = useState(appName);
  const [newType, setNewType] = useState(appType);
  const [newGhRepo, setNewGhRepo] = useState(appHgRepo);
  const [updatedTeams, setUpdatedTeams] = useState(appTeams);
  const [newBriefDescr, setNewBriefDescr] = useState(appBriefDescr);

  useEffect(() => {
    setUpdatedApp({
      ...app,
      name: newName,
      type: newType,
      gitHubRepo: newGhRepo,
      teams: updatedTeams,
      briefDescr: newBriefDescr,
    });
  }, [newName, newType, newGhRepo, updatedTeams, newBriefDescr ]);

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
        <label>Teams Concerned</label>
        <label>(if more than one please separate by coma)</label>
        <input
          name="teams"
          placeholder={updatedTeams}
          value={updatedTeams}
          onChange={(e) => setUpdatedTeams(e.target.value)}
        />
      </SingleInputCont>
      <SingleInputCont>
        <label>Brief Description</label>
        <TextareaWrapper>
          <textarea
            name="appBriefDescr"
            placeholder={appBriefDescr}
            value={newBriefDescr}
            size="3em"
            onChange={(e) => setNewBriefDescr(e.target.value)}
          />
        </TextareaWrapper>
      </SingleInputCont>
    </AppInputContainer>
  );
};

export default ManageAppDetails;
