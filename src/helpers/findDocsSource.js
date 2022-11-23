

const findDocsSource = async (link) => {
  const linkParts = link
  .split("/")
  .filter((fragment) => (
    fragment !== ""
  ))

  const lastLinkIndx = linkParts.length -1;
  
  const formatedFrag = () => {
    const linkParts = link
    .split("/")
    .filter((fragment) => (
      fragment !== ""
    ))
    const lastLinkIndx = linkParts.length -1;
    linkParts[lastLinkIndx].split("-").join(" ");
  }
  console.log("lastLinkIndx", lastLinkIndx);
  // fetch(https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBox.js)
  // https://paper.dropbox.com/doc/Imposter-syndrome-workshop-ideas--BtYF4rZRzasgUTPjgE7J0osIAg-vIsKjOV2rmXL6H3g39LgZ
  // https://jira.dev.bbc.co.uk/browse/DPUB-6213
  // https://confluence.dev.bbc.co.uk/display/NEWSART/Optimo+Articles+Runbook
  const findTitle = (source) => {
    console.log("source!!!!", source);
    if(source==="paper"){
      const lastLinkFragment = linkParts[lastLinkIndx];
      console.log("lastLinkFragment!!!!!", lastLinkFragment);
      return lastLinkFragment.split("--")[0].split("-").join(" ")
      
    }
    // if(source==="jira"){
    //   const lastLinkFragment = link.split("/")[-1];
    //   return lastLinkFragment.split("--").split("-")
      
    // }
    if(source==="confluence"){
      const lastLinkFragment = linkParts[lastLinkIndx];
      return lastLinkFragment.split("+").join(" ")
      
    }
    console.log("last thing in link array =", linkParts[lastLinkIndx]);
    return linkParts[lastLinkIndx].split("-").join(" ");
  }
  
  
  console.log("linkParts", linkParts);
  const source = linkParts[1].split(".")[0];
  console.log("source", source);
  const title = await findTitle(source);
  console.log("title", title);
  return {source, title};
}

export default findDocsSource;