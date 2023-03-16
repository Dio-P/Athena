export const addClickedKeyToPreexParts = (preExistingParts) => {

  if (preExistingParts) {
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

export const findConserningParts = (dbPartsWithClickedKey, newPartsAdded) => {
  const checkedExistingPartIds = Object.values(dbPartsWithClickedKey)
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


