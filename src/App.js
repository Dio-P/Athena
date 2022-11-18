import {
  Route,
  Routes,
  Outlet,
  useNavigate
} from "react-router-dom";
import Header from "./containers/Header";
import AllDepartmentsBox from "./containers/AllDepartmentsBox";
import AppPage from "./components/AppPage";
import { useState } from "react";

function App() {

  const [alldepartments, setAllDepartments] = useState([
    {
      name: "dpub",
      apps: [
        {
          name: "optimo",
          test: "test"
        },
        {
          name: "tipo",
          test: "test"
        },
      ]
    },
    {
      name: "data lab",
      apps: [
        {
          name: "dataLab app1",
          test: "test"
        },
        {
          name: "dataLab app2",
          test: "test"
        },
      ]
    }
  ])

  return (
    <div className="">
      <h1>Athena</h1>
      <Header/>
      <Routes>
        <Route path="/" element={<AllDepartmentsBox alldepartments={alldepartments} />}/>
        <Route path="/appPage/:appName" element={<AppPage/>}/> 
      </Routes>
      
      
    </div>
  );
}

export default App;
