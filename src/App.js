import Header from "./containers/Header";
import TeamsBox from "./containers/TeamsBox";
import { useEffect, useMemo, useState } from "react";
import useFolderHelper from "./hooks/useFolderHelper";
import useParamsHelper from "./hooks/useParamsHelper";
import { v4 as uuidv4 } from "uuid";

function App() {
  const DEFAULT_DEPARTMENT = useMemo(() => "DPub", []);

  return (
    <div>
      <h1>Athena</h1>
      <Header/>
      <TeamsBox
        department={DEFAULT_DEPARTMENT}
      />

    </div>
  );
}

export default App;
