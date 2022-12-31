import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import gql from 'graphql-tag';

export const SEARCH_TEAM_APPS_QUERY = gql`
  query($team: String!){
    getAppsByTeam(team: $team){
      name
      id
    }
  }
`

const useTeamAppsNamesSearch = (team) => {
  const [apps, setApps] = useState("");

  const [searchApps, {loading, error, data}] = useLazyQuery(SEARCH_TEAM_APPS_QUERY);

  useEffect(() => {
     console.log("appss@@@", apps);
  }, [apps])

  useEffect(() => {
    console.log("insideUseTeamAppSearchBefore");
    if(!team){
      console.log("no team");
      setApps([]);
      return;
    }
    console.log("insideUseTeamAppSearchAfter");
    searchApps({ 
      variables: 
        { team } 
      })
    
  }, [team])

  useEffect(() => {
    if(data && data.getAppsByTeam){
      console.log("data@@@", data.getAppsByTeam);
      const newApps = data.getAppsByTeam.map(app => (
        {
          name: app.name,
          id: app.id
        }
      ))
      setApps([...newApps])//is this set Properly?
    }
    
  }, [data])

  return [apps, loading, error]
}

export default useTeamAppsNamesSearch 