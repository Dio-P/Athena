import { useSearchParams } from "react-router-dom";
import Header from "./containers/Header";
import TeamsBox from "./containers/TeamsBox";
import AppPage from "./containers/AppPage";
import SinglePartPage from "./containers/SinglePartPage";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useValuesFromUrlParams from "./hooks/useValuesFromUrlParams";
function App() {
  const DEFAULT_DEPARTMENT = "DPub";

  useEffect(() => {
  console.log("app rendered");  
}, [])
  
  // let [searchParams, setSearchParams] = useSearchParams();


  // const params = useMemo(() => Object.fromEntries([...searchParams]) ,[searchParams]) ;

  return (
    <div className="">
      <h1>Athena</h1>
      <Header/>
      <TeamsBox
        department={DEFAULT_DEPARTMENT}
        // params={params}
        // updatingParams={setSearchParams}
      />

    </div>
  );
}

export default App;
