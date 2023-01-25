import { useEffect, useState } from "react";

const validateToStringOrNone = (newValuesObj) =>
newValuesObj? Object.values(newValuesObj).join("~") : null;

const composeNewGenericSearchParam = (newValuesObj) => {
  const newSearchValuesString = validateToStringOrNone(newValuesObj);

  return newSearchValuesString;
};

const useComposeNewDocSearchParam = (newFolderObj, newPartObj) => {
  const [docSearchParams, setDocSearchParams] = useState(undefined);
  const [newUserInput, setNewUserInput] = useState(undefined);

  const [newFolder, setNewFolder] = useState(undefined);
  const [newPart, setNewPart] = useState(undefined);


  let newFolderParams = newFolderObj && composeNewGenericSearchParam(newFolderObj);
  let newPartParams = newPartObj && composeNewGenericSearchParam(newPartObj);

  useEffect(() => {
    if(newFolderObj){
      setNewFolder(newFolder)
      console.log("newFolder££", newFolder);
    }
  }, [newFolderObj])
  useEffect(() => {
    if(newPartObj){
      setNewPart(newPart) 
      console.log("newPart££", newPart);
    }
  }, [newPartObj])

  useEffect(() => {
    console.log("newFolderParams@@", newFolderParams);
    console.log("newPartParams@@", newPartParams);
    setNewUserInput([newFolderParams, newPartParams]);
  }, [newFolderParams, newPartParams]);

  useEffect(() => {
    if (newUserInput) {
      console.log("newUserInput££", newUserInput);
      const allNewFieldsjoinedString = Object.values(newUserInput).join("|");
      setDocSearchParams(allNewFieldsjoinedString);
    }
  }, [newUserInput]);
  console.log("docSearchParams££££", docSearchParams);
  return [docSearchParams];
};

export default useComposeNewDocSearchParam;
