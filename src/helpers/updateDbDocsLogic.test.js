import { createAppByFolders } from "./updateDbDocsLogic";
import mockApp from "../fixtures/mockApp";
import mockAppByFoldersMutation from "../fixtures/mockAppByFoldersMutation";


describe("updateDbDocsLogic", () => {
  it("return the correct mutation of the original app object", () => {
    const mutatedApp = createAppByFolders(mockApp);
     expect(mutatedApp).toStrictEqual(mockAppByFoldersMutation);
  }) 
})
