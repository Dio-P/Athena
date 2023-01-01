import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import gql from 'graphql-tag';

const SEARCH_APP_BY_ID = gql`
    query($id: ID!){
        getAppById(id: $id){
            name
            type
            gitHubRepo
            teams
            folders
            parts
            properties
        }
    }
`;

const useAppByIdSearch = (id) => {
    const [app, setApp] = useState("");

    const [searchApp, {loading, error, data}] = useLazyQuery(SEARCH_APP_BY_ID)
     
    useEffect(() => {
        if(!id){
            setApp({});
            return;
        }

        searchApp({ 
            variables: 
              { id } 
            })
         
    }, [id]);

    useEffect(() => {
        if(data && data.getAppById){
            const newApp = data.getAppById;
            setApp({...newApp});
        };
    }, [data]);

    return [app, loading, error ];
}

export default useAppByIdSearch