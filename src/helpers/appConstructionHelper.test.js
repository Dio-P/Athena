import {
  allPartsFolderToBeDisplValueToStr,
  allFoldersIdStringsToNum,
} from "./appConstructionHelper";

const allPartsInputMock = [
  {
    clicked: true,
    folderToBeDisplayedIn: 1,
    ghRepo: "",
    id: "e3d1f4d6-2a51-4683-b58f-871ddd59c191",
    name: "somePart1",
    type: "",
  },
  {
    clicked: true,
    folderToBeDisplayedIn: 2,
    ghRepo: "",
    id: "a7x1f4d6-1a51-4656-b90f-721add59c457",
    name: "somePart2",
    type: "",
  },
];

const allFoldersInputMock = [
  { id: "1", name: "folder1" },
  { id: "2", name: "folder2" },
  { id: "3", name: "folder3" },
];

describe("allPartsFolderToBeDisplValueToStr", () => {
  const newPartsArray = allPartsFolderToBeDisplValueToStr(allPartsInputMock);

  it("should remove the clicked value from the part", () => {
    expect(newPartsArray).not.toContain("clicked: true");
  });
  it("should change folderToBeDisplayedIn values to a strings", () => {
    expect(typeof newPartsArray[0].folderToBeDisplayedIn).toBe("string");
    expect(typeof newPartsArray[1].folderToBeDisplayedIn).toBe("string");
  });
});

describe("allFoldersIdStringsToNum", () => {
  const newAllFoldersArray = allFoldersIdStringsToNum(allFoldersInputMock);

  it("should change all id  values to Ints", () => {
    expect(typeof newAllFoldersArray[0].id).toBe("number");
    expect(typeof newAllFoldersArray[1].id).toBe("number");
    expect(typeof newAllFoldersArray[2].id).toBe("number");
  });
});
