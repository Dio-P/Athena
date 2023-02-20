export const addClickedKeyToPreexParts = (preExistingParts) => {
  console.log("addClickedToPreexParts");
  console.log("preExistingParts", preExistingParts);

  if (preExistingParts) {
    console.log("inside preex parts memo", preExistingParts);
    const allAppPartsHelper = {};
    preExistingParts.forEach(
      (part) =>
        (allAppPartsHelper[part.name] = {
          ...part,
          clicked: false,
        })
    );
    return allAppPartsHelper;
  }
};

export const findConserningParts = (allAppParts, newPartsAdded) => {
  const checkedExistingPartIds = Object.values(allAppParts)
    .filter((part) => part.clicked)
    .map((part) => part.id);
  const newPartsIds = Object.values(newPartsAdded).map((part) => part.id);
  return [...checkedExistingPartIds, ...newPartsIds];
};

const newAppsUniqueFoldersKeys = (newPartsAdded) =>
  Array.from(
    new Set(
      Object.values(newPartsAdded).map(
        (part) => part.folderToBeDisplayedIn + ""
      )
    )
  );

const existingAppsUniqueFolderKeys = (preexistingParts) =>
Array.from(
  new Set(
    Object.values(preexistingParts).map((part) => part.folderToBeDisplayedIn)
  )
);

export const allUniqueFolderKeys = (preexistingParts, newPartsAdded) =>
  !!preexistingParts && [
    ...newAppsUniqueFoldersKeys(newPartsAdded),
    ...existingAppsUniqueFolderKeys(preexistingParts),
  ];


