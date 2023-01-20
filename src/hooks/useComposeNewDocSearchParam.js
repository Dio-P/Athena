import { useEffect, useState } from "react";

const composeNewFolderSearchParam = (newFolderObj) => {
  const newFolderValues = Object.values(newFolderObj);
  console.log("newFolderValues", newFolderValues);
  const newFolderValuesToString = newFolderValues.join("~");
  console.log("newFolderValuesToString@@", newFolderValuesToString);
  return newFolderValuesToString;
};

const useComposeNewDocSearchParam = (newFolderObj) => {
  const [docSearchParams, setDocSearchParams] = useState(undefined)
  const [newUserInput, setNewUserInput] = useState(undefined)

  let newFolderParams = newFolderObj && composeNewFolderSearchParam(newFolderObj);
  // let newFolderParams = composeNewFolderSearchParam(newFolderObj) || undefined;
  useEffect(() => {
    setNewUserInput({newFolder: newFolderParams, test: "test"})
  }, [newFolderParams]);

  useEffect(() => {
    if(newUserInput){
      console.log("newUserInput££", newUserInput);
      const allNewFieldsjoinedString = Object.values(newUserInput).join("|")
      setDocSearchParams(allNewFieldsjoinedString) 
    }
  }, [newUserInput])
  return [docSearchParams]
};

export default useComposeNewDocSearchParam;
