import Header from "./containers/Header";
import TeamsBox from "./containers/TeamsBox";
import { useEffect, useMemo, useState } from "react";
import useFolderHelper from "./hooks/useFolderHelper";
import useParamsHelper from "./hooks/useParamsHelper";
import { v4 as uuidv4 } from "uuid";

function App() {
  const DEFAULT_DEPARTMENT = useMemo(() => "DPub", []);
  const DEFAULT_NEW_PART = {
    name: "",
    id: uuidv4(),
    ghRepo: "",
    type: "",
    folderToBeDisplayedIn: "",
  };

  const { setClickedFolder } = useFolderHelper();
  const { manageFolderDdOpenParam } = useParamsHelper();

  const [newPart, setNewPart] = useState(DEFAULT_NEW_PART);
  const [folderOfNewPart, setFolderOfNewPart] = useState("");
  const [folderBeenCreated, setFolderBeenCreated] = useState("");
  const [newlyCreatedFolders, setNewlyCreatedFolders] = useState([]);

  const folderInfoToState = (folder) => {
    setClickedFolder(folder.name);
    setFolderOfNewPart(folder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: folder.id,
    });
    manageFolderDdOpenParam();
  };

  const addNewFolderAndClear = () => {
    const newFolder = {
      name: folderBeenCreated,
      id: newFolderIndexKey,
    };
    setFolderOfNewPart(newFolder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: newFolderIndexKey,
    });

    setIsPopUpOpen(false);
    setClickedFolder(folderBeenCreated);
    manageFolderDdOpenParam();
  };

  return (
    <div>
      <h1>Athena</h1>
      <Header/>
      <TeamsBox
        department={DEFAULT_DEPARTMENT}
        newPart={newPart}
        setNewPart={setNewPart}
        folderOfNewPart={folderOfNewPart}
        setFolderOfNewPart={setFolderOfNewPart}
        folderBeenCreated={folderBeenCreated}
        setFolderBeenCreated={setFolderBeenCreated}
        newlyCreatedFolders={newlyCreatedFolders}
        setNewlyCreatedFolders={setNewlyCreatedFolders}
        folderInfoToState={folderInfoToState}
        addNewFolderAndClear={addNewFolderAndClear}
      />

    </div>
  );
}

export default App;
