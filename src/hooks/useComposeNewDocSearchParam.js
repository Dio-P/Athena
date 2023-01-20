import { useEffect, useState } from "react";

const validateToStringOrNone = (newValues) =>
newValues.lenght > 0 ? newValues.join("~") : "NONE";

const composeNewFolderSearchParam = (newFolderObj) => {
  const newFolderValues = Object.values(newFolderObj);
  console.log("validateToStringOrNone(newFolderValues)", validateToStringOrNone(newFolderValues));

  return validateToStringOrNone(newFolderValues);
};

const composeNewPartSearchParam = (newPartObj) => {
  const newPartValues = Object.values(newPartObj);
  console.log("validateToStringOrNone(newPartValues)", validateToStringOrNone(newPartValues));
  return validateToStringOrNone(newPartValues)
};

const useComposeNewDocSearchParam = (newFolderObj, newPartObj) => {
  const [docSearchParams, setDocSearchParams] = useState(undefined);
  const [newUserInput, setNewUserInput] = useState(undefined);

  let newFolderParams = newFolderObj && composeNewFolderSearchParam(newFolderObj);
  let newPartParams = newPartObj && composeNewPartSearchParam(newPartObj);

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
