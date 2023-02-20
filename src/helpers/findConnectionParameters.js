

const findConnectionParameters = async (link) => {
  const linkParts = link
  .split("/")
  .filter((fragment) => (
    fragment !== ""
  ))

  const lastLinkIndx = linkParts.length -1;

  const findName = (source) => {
    const lastLinkFragment = linkParts[lastLinkIndx];

    if(source==="paper"){
      return lastLinkFragment.split("--")[0].split("-").join(" ")
    }
    if(source==="confluence"){
      return lastLinkFragment.split("+").join(" ")
    }
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
  const name = await findName(source);
  return {source, name};
}

export default findConnectionParameters;

  // fetch(https://github.com/Dio-P/Athena/blob/main/src/components/AddNewConnectionBlock.js)
  // https://paper.dropbox.com/doc/Imposter-syndrome-workshop-ideas--BtYF4rZRzasgUTPjgE7J0osIAg-vIsKjOV2rmXL6H3g39LgZ
  // https://jira.dev.bbc.co.uk/browse/DPUB-6213
  // https://confluence.dev.bbc.co.uk/display/NEWSART/Optimo+Articles+Runbook