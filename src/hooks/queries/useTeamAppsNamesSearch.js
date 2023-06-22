import { useState, useEffect, useMemo } from 'react';
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

  // const teamMemo = useMemo(() => team, [team])
  const [apps, setApps] = useState("");

  const [searchApps, {loading, error, data, refetch}] = useLazyQuery(SEARCH_TEAM_APPS_QUERY);

  useEffect(() => {
    if(team){
      console.log("querying");
      searchApps({ 
        variables: 
          { team: team } 
        })
    }
    
  }, [team])

  useEffect(() => {
    
    console.log("to get the data ");
    if(data && data.getAppsByTeam){

      console.log("getting the data");
      const newApps = data.getAppsByTeam.map(app => (
        {
          name: app.name,
          id: app.id
        }
      ));
      setApps([...newApps]);
    };
    
  }, [data]);


  return [apps, loading, error, refetch];
}

export default useTeamAppsNamesSearch 