import { createAppByFolders, updateWithFolders, putPartIdToUpdatedFolder, findPartsDocs } from "./updateDbDocsLogic";
import mockApp from "../fixtures/mockApp";
import mockAppByFoldersMutation from "../fixtures/mockAppByFoldersMutation";

describe("updateDbDocsLogic function", () => {
  it("returns correctly the whole mutation of the original app object", () => {
    expect(createAppByFolders(mockApp)).toStrictEqual(mockAppByFoldersMutation);
  });

  const {
    folders,
    parts,
    properties: { docs },
  } = mockApp;

  describe("updateWithFolders function", () => {
    it("populates the mutated app with correct folders obj", () => {
      expect(updateWithFolders(folders, parts, docs)).toStrictEqual(
        mockAppByFoldersMutation.folders
      );
    });
  });
  describe("putPartIdToUpdatedFolder", () => {
    it("populates folder with correct parts obj", () => {
      expect(putPartIdToUpdatedFolder("0", parts, docs)).toStrictEqual(
        mockAppByFoldersMutation.folders[0].parts
      );
    });
  })
  describe("findPartsDocs", () => {
    it("populates parts with correct docs obj", () => {
      expect(findPartsDocs(docs, "somePartId1")).toStrictEqual(
        mockAppByFoldersMutation.folders[0].parts[0].docs
      );
    });
  })
});
