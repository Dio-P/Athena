export const updateWithFolders = (folders, parts, docs) => {
  console.log("folders in", folders);
  console.log("parts in", parts);
  console.log("docs in", docs);
  const updatedFolders = folders.map((folder) => ({
    ...folder,
    parts: putPartIdToUpdatedFolder(`${folder.id}`, parts, docs),
  }));
  return updatedFolders;
};

export const putPartIdToUpdatedFolder = (folderId, parts, docs) => {
  const folderParts = parts.filter(
    (part) => part.folderToBeDisplayedIn === folderId
  );
  const updatedFolderParts = folderParts.map((part) => ({
    ...part,
    docs: findPartsDocs(docs, `${part.id}`),
  }));
  return updatedFolderParts;
};

export const findPartsDocs = (docs, partId) => {
  console.log("@docs@", docs);
  console.log("@partId@", partId);
  const appDocs = docs.filter((doc) => {
    return doc.concerningParts.includes(partId);
  });
  return appDocs;
};

export const createAppByFolders = (app) => ({
  id: app.id,
  name: app.name,
  type: app.type,
  gitHubRepo: app.gitHubRepo,
  briefDescr: app.briefDescr,
  folders: updateWithFolders(app.folders, app.parts, app.properties.docs),
});
