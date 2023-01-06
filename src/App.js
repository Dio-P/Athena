import {
  Route,
  Routes,
  Outlet,
  useSearchParams,
  useParams,
  useNavigate,
  useLoaderData,
  useRouteLoaderData,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Header from "./containers/Header";
import TeamsBox from "./containers/TeamsBox";
import AppPage from "./containers/AppPage";
import SinglePartPage from "./containers/SinglePartPage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useValuesFromUrlParams from "./hooks/useValuesFromUrlParams";
// the above needs to go when the info is in the db
import Test from "./components/Test";
function App() {

  const mockPartId1 = uuidv4()
  const mockPartId2 = uuidv4()

  const DEFAULT_DEPARTMENT = "DPub";

  // const [alldepartments, setAllDepartments] = useState(MOCK_DATA);
  let [searchParams, setSearchParams] = useSearchParams();
  const [teamParam, appIdParam] = useValuesFromUrlParams()


  // useEffect(() => {
  //   setAllDepartments(MOCK_DATA)
  // }, []);
  // useEffect(() => {
  //   gettingParamsValues()
  // }, []);
  // const params = Object.fromEntries([...searchParams]);
  const params = useParams()

  // const gettingParamsValues = () => {
  //   console.log("inside getting params values");
  //   const paramValuesFromTeamsBox = Object.fromEntries([...searchParams]);
  //   console.log("paramValuesFromApp!@£", paramValuesFromTeamsBox);
  //   console.log("teamParam, appIdParam", teamParam, appIdParam);
  //   setSearchParams(paramValuesFromTeamsBox);
  // }


  return (
    <div className="">
      <h1>Athena</h1>
      <Header/>
      <Routes>
        <Route path="/*" 
        element={<TeamsBox 
          defaultDepartment={DEFAULT_DEPARTMENT}
          // alldepartments={alldepartments}///to be changed when queries working properly
          // params={params}
          />}
          loader={(obj) => {
            console.log("obj['*']", obj); // "one/two"
          }}
          action={({ params }) => {}}
        />
        <Route path="/?team=:team&appId=:appId" element={<AppPage appId={"appId"}/>}/> 
        {/* <Route path="/:team/:appId" element={<AppPage appId={"appId"}/>}/>  */}
        {/* http://localhost:3000/DPub/63ad884923b0804c5a2ce94d */}
        {/* <Route path="/:team/:appId/:partId" element={<Test appIdToDisplay={params.appId}/>}/>  */}
      </Routes>
      
      
    </div>
  );
}

export default App;
