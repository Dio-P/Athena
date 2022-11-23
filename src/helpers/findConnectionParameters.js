

const findConnectionParameters = async (link) => {
  const linkParts = link
  .split("/")
  .filter((fragment) => (
    fragment !== ""
  ))

  const lastLinkIndx = linkParts.length -1;

  const findTitle = (source) => {
    if(source==="paper"){
      const lastLinkFragment = linkParts[lastLinkIndx];
      console.log("lastLinkFragment!!!!!", lastLinkFragment);
      return lastLinkFragment.split("--")[0].split("-").join(" ")
    }
    if(source==="confluence"){
      const lastLinkFragment = linkParts[lastLinkIndx];
      return lastLinkFragment.split("+").join(" ")
      
    }
    console.log("last thing in link array =", linkParts[lastLinkIndx]);
    return linkParts[lastLinkIndx].split("-").join(" ");
  }

  const findSource = () => {
    const firstLinkFragment = linkParts[1].split(".");
    if(firstLinkFragment.includes("paper")){
      return "paper";
    }
    if(firstLinkFragment.includes("github")){
      return "github";
    }
    if(firstLinkFragment.includes("zeplin")){
      return "zeplin";
    }
    if(firstLinkFragment.includes("confluence")){
      return "confluence";
    }
    if(firstLinkFragment.includes("jira")){
      return "jira";
    }

  }
  
  
  const source = findSource();
  const title = await findTitle(source);
  return {source, title};
}

export default findConnectionParameters;

  // fetch(https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBox.js)
  // https://paper.dropbox.com/doc/Imposter-syndrome-workshop-ideas--BtYF4rZRzasgUTPjgE7J0osIAg-vIsKjOV2rmXL6H3g39LgZ
  // https://jira.dev.bbc.co.uk/browse/DPUB-6213
  // https://confluence.dev.bbc.co.uk/display/NEWSART/Optimo+Articles+Runbook