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
  const teamMemo = useMemo(() => team, [team])
  const [apps, setApps] = useState("");

  const [searchApps, {loading, error, data}] = useLazyQuery(SEARCH_TEAM_APPS_QUERY);

  useEffect(() => {
    console.log("useTeamAppsNamesSearch", "teamMemo", teamMemo, "team", team, loading, error, data);  
  }, []);

  useEffect(() => {
    console.log("team", team);
    console.log("teamMemo", teamMemo);
} , [team, teamMemo])

  useEffect(() => {
    // if(!team){
    //   setApps([]);
    //   return;
    // }

    searchApps({ 
      variables: 
        { team: teamMemo } 
      })
    
  }, [teamMemo])

  useEffect(() => {
    if(data && data.getAppsByTeam){
      const newApps = data.getAppsByTeam.map(app => (
        {
          name: app.name,
          id: app.id
        }
      ));
      setApps([...newApps]);
    };
    
  }, [data]);

  return [apps, loading, error];
}

export default useTeamAppsNamesSearch 