import Header from "./containers/Header";
import TeamsBox from "./containers/TeamsBox";
import { useEffect, useMemo } from "react";

function App() {
  const DEFAULT_DEPARTMENT = useMemo(() => "DPub", []);

  useEffect(() => {
  console.log("app rendered");  
}, [])

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
