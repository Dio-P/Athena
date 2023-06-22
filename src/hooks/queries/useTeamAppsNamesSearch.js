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

const useTeamAppsNamesSearch = (team, newAppWasJustAdded, setNewAppWasJustAdded) => {

  // const teamMemo = useMemo(() => team, [team])
  const [apps, setApps] = useState("");

  const [searchApps, {loading, error, data}] = useLazyQuery(SEARCH_TEAM_APPS_QUERY);

  useEffect(() => {
    console.log("newAppWasJustAdded inside useTeamsAppNames", newAppWasJustAdded); 
  }, [newAppWasJustAdded])

  useEffect(() => {
    console.log("to query ", team, newAppWasJustAdded);

    if(team && newAppWasJustAdded){
      console.log("querying");
      searchApps({ 
        variables: 
          { team: team } 
        })
    }
    
  }, [team, newAppWasJustAdded])

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
      setNewAppWasJustAdded(false);
    };
    
  }, [data]);


  return [apps, loading, error];
}

export default useTeamAppsNamesSearch 