

const findDocsSource = (link) => {
  // https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBox.js
  const linkParts = link
  .split("/")
  .filter((fragment) => (
    fragment !== ""
  ))
  console.log("linkParts", linkParts);
  return linkParts[1]
}

export default findDocsSource;