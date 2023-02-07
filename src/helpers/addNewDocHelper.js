

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
}