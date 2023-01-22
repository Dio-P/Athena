import { useEffect, useState } from "react";

const validateToStringOrNone = (newValuesObj) =>
newValuesObj? Object.values(newValuesObj.join("~")) : "NONE";

const composeNewGenericSearchParam = (newValuesObj) => {
  const newSearchValuesString = validateToStringOrNone(newValuesObj);
  console.log("newSearchValuesString", newSearchValuesString);

  return newSearchValuesString;
};

const useComposeNewDocSearchParam = (newFolderObj, newPartObj) => {
  const [docSearchParams, setDocSearchParams] = useState(undefined);
  const [newUserInput, setNewUserInput] = useState(undefined);

  let newFolderParams = composeNewGenericSearchParam(newFolderObj);
  let newPartParams = composeNewGenericSearchParam(newPartObj);

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
  return [docSearchParams];
};

export default useComposeNewDocSearchParam;
