import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";


const useParamsHelper = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    team,
    appId,
    addingNewConnection,
    addingNewPart,
    addingNewFolder,
  } = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]) ;

  const clickingToAddNewPart = () => {
    if (!addingNewPart) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection });
    }
  };

  const clickingToAddNewFolder = () => {
    if (!addingNewFolder) {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart, addingNewFolder: true });
    } else {
      setSearchParams({ team, appId, addingNewConnection, addingNewPart });
    }
  };

  const keepExistingParams = () => {
    const params = Object.fromEntries([...searchParams]);
    setSearchParams({...params});
  };

  return [clickingToAddNewPart, clickingToAddNewFolder, keepExistingParams]
};

export default useParamsHelper;