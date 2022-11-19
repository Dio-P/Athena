import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



const AppPage = ({ app }) => {
  // const location = useLocation();
  // const app = location.state;

  const [thisApp, setThisApp] = useState("")

  useEffect(()=>{
    setThisApp(app)
  }, [app])

  // useEffect(()=>{
  //   console.log("thisApp", thisApp);
  // }, [thisApp])

  return (
    <div>
      <h4>{app.name}</h4>
      
    </div>
  )
}

export default AppPage;