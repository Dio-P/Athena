import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AppFolderIcon = ({ app }) => {
  const [thisApp, setThisApp] = useState({name: "optimo", test: "testing"})

  // useEffect(()=>{
  //   setThisApp(app)
  // }, [app])

  // useEffect(()=>{
  //   console.log("thisApp", thisApp);
  // }, [thisApp])

  return(
      <div>
        <Link 
        to={`/appPage/:${thisApp.name}`}
        state={{...thisApp}}>
          <button> 
            {thisApp.name}
          </button>
        </Link>
    </div>
  ) 
}

export default AppFolderIcon