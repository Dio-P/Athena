import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import gql from 'graphql-tag';

export const SEARCH_APP_BY_ID_QUERY = gql`
    query($id: ID!) {
        getAppById(id: $id) {
            name
            type
            gitHubRepo
            teams
            folders {
                title
                id
            }
            parts {
                name
                id
                ghRepo
                type
                folderToBeDisplayedIn
            }
            properties {
                docs {
                    title
                    url
                    id
                    source
                    lastModified
                    concerningParts
                }
            }
        }
    }
`;

const useAppByIdSearch = (id) => {
    const [appToDisplay, setAppToDisplay] = useState("");

    const [searchApp, {loading, error, data}] = useLazyQuery(SEARCH_APP_BY_ID_QUERY);
 
     useEffect(() => {
        console.log("app last@@@@", appToDisplay);
     }, [appToDisplay]);///
 
    useEffect(() => {
        if(!id){
            setAppToDisplay({});
            return;
        }
        searchApp({ 
            variables: 
                { id: id } 
            })
         
    }, [id]);

    useEffect(() => {
        if(data && data.getAppById){
            const newApp = data.getAppById;
            setAppToDisplay({...newApp});
        };
    }, [data]);

    return [appToDisplay, loading, error ];
}

export default useAppByIdSearch
