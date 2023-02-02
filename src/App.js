import { useSearchParams } from "react-router-dom";
import Header from "./containers/Header";
import TeamsBox from "./containers/TeamsBox";
// import AppPage from "./containers/AppPage";
// import SinglePartPage from "./containers/SinglePartPage";
// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
// import useValuesFromUrlParams from "./hooks/useValuesFromUrlParams";
function App() {

  // const mockPartId1 = uuidv4()
  // const mockPartId2 = uuidv4()

  const DEFAULT_DEPARTMENT = "DPub";

  // const [teamParam, appIdParam] = useValuesFromUrlParams()
  
  let [searchParams, setSearchParams] = useSearchParams();


  const params = Object.fromEntries([...searchParams]);

  return (
    <div className="">
      <h1>Athena</h1>
      <Header/>
      <TeamsBox
        defaultDepartment={DEFAULT_DEPARTMENT}
        params={params}
        updatingParams={setSearchParams}
      />

    </div>
  );
}

export default App;
