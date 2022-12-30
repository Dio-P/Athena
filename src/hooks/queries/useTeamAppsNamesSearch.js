import { useState, useEffect } from 'react';
import { useLazyQuery } from 'react-apollo';
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
    if(!team){
      setApps([]);
      return;
    }
    
    
  }, [team])

  useEffect(() => {
    if(data && data.getAppsByTeam){
      console.log("data@@@", data);
      const newApps = data.getAppsByTeam.map(app => (
        {
          name: app.name,
          id: app.id
        }
      ))
      setApps([...newApps])
    }
    
  }, [data])

  return [apps, loading, error]
}

export default useTeamAppsNamesSearch 