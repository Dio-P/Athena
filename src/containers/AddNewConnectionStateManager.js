import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddNewConnectionBox from "../components/AddNewConnectionBox";

const AddConnectionStateManager = ({ addingNewConnection, appToDisplay}) => {
  const [url, setUrl] = useState("");
  const [newPartsAdded, setNewPartsAdded] = useState("");
  const [allAppParts, setAllAppParts] = useState([]);
  const [newPart, setNewPart] = useState({
    name: "",
    id: uuidv4(),
    ghRepo: "",
    type: "",
    folderToBeDisplayedIn: "",
  });
  const [folderOfNewPart, setFolderOfNewPart] = useState("");

  return (
    addingNewConnection && appToDisplay && (
      <AddNewConnectionBox
        url={url}
        setUrl={setUrl}
        newPartsAdded={newPartsAdded}
        setNewPartsAdded={setNewPartsAdded}
        allAppParts={allAppParts}
        setAllAppParts={setAllAppParts}
        newPart={newPart}
        setNewPart={setNewPart}
        folderOfNewPart={folderOfNewPart}
        setFolderOfNewPart={setFolderOfNewPart}
      />
    )
  )
};

export default AddConnectionStateManager;