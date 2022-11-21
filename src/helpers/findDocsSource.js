

const findDocsSource = (link) => {
  // fetch(https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBox.js)
  // https://paper.dropbox.com/doc/Imposter-syndrome-workshop-ideas--BtYF4rZRzasgUTPjgE7J0osIAg-vIsKjOV2rmXL6H3g39LgZ
  // https://jira.dev.bbc.co.uk/browse/DPUB-6213
  // https://confluence.dev.bbc.co.uk/display/NEWSART/Optimo+Articles+Runbook
  const findTitle = (source) => {
    // if(source==="github"){
    //   return link.split("/")[-1];

    // }
    if(source==="paper"){
      const lastLinkFragment = link.split("/")[-1];
      return lastLinkFragment.split("--").split("-")
      
    }
    // if(source==="jira"){
    //   const lastLinkFragment = link.split("/")[-1];
    //   return lastLinkFragment.split("--").split("-")
      
    // }
    if(source==="confluence"){
      const lastLinkFragment = link.split("/")[-1];
      return lastLinkFragment.split("+")
      
    }
    console.log("last thing in link array =", link.split("/")[-1]);
    return link.split("/")[-1];
  }
  
  const linkParts = link
  .split("/")
  .filter((fragment) => (
    fragment !== ""
  ))
  console.log("linkParts", linkParts);
  const source = linkParts[1].split(".")[0];
  const title = findTitle()
  return source
}

export default findDocsSource;