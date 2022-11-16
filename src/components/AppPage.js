import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



const AppPage = () => {
  const location = useLocation();
  const app = location.state;

  const [thisApp, setThisApp] = useState("")

  useEffect(()=>{
    setThisApp(app)
  }, [app])

  useEffect(()=>{
    console.log("thisApp", thisApp);
  }, [thisApp])

  return (
    <div>
      This is the AppPage for:
      {thisApp.name}
    </div>
  )
}

export default AppPage;