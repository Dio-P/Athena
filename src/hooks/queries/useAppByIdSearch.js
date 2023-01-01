import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import gql from 'graphql-tag';

export const SEARCH_APP_BY_ID_QUERY = gql`
    query($id: ID!){
        getAppById(id: $id){
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

// export const SEARCH_APP_BY_ID = gql`
//     query GetAppById($getAppByIdId: ID!) {
//         getAppById(id: $getAppByIdId) {
//             name
//             type
//             gitHubRepo
//             teams
//             folders {
//                 title
//                 id
//             }
//             parts {
//                 name
//                 id
//                 ghRepo
//                 type
//                 folderToBeDisplayedIn
//             }
//             properties {
//                 docs {
//                     title
//                     url
//                     id
//                     source
//                     lastModified
//                     concerningParts
//                 }
//             }
//         }
//     }
// `;

const useAppByIdSearch = (id) => {
    const [app, setApp] = useState("");

    const [searchApp, {loading, error, data}] = useLazyQuery(SEARCH_APP_BY_ID_QUERY);
     
    useEffect(() => {
        console.log("id#@#@#@#", id);
        console.log("type of id#@#@#@#", typeof id);
        // if(!id){
        //     setApp({});
        //     return;
        // }

        searchApp({ 
            variables: 
              { id } 
            })
         
    }, [id]);

    useEffect(() => {
        console.log("data", data);
        if(data && data.getAppById){
            const newApp = data.getAppById;
            console.log("newApp", newApp);
            setApp({...newApp});
        };
    }, [data]);

    return [app, loading, error ];
}

export default useAppByIdSearch

// 63b06e8a723b10add8b09aa1
// 63b06e8a723b10add8b09aa1