export const allPartsFolderToBeDisplValueToStr = (allParts) => {
  console.log("allParts$$$$$", allParts);
  return allParts.map(({clicked, ...partWithoutClicked}) => ({
    ...partWithoutClicked,
    folderToBeDisplayedIn: `${partWithoutClicked.folderToBeDisplayedIn}`
    }));
};

export const allFoldersIdStringsToNum = (allFolders) => {
  console.log("allFolders$$$$$$$", allFolders);
  return allFolders.map((folder) => ({
    ...folder,
    id: Number(folder.id)
    }));
}