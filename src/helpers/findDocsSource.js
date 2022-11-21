

const findDocsSource = (link) => {
  // https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBox.js
  const linkParts = link
  .split("/")
  .filter((fragment) => (
    fragment !== ""
  ))
  console.log("linkParts", linkParts);
  const source = linkParts[1].split(".")[0]
  return source
}

export default findDocsSource;