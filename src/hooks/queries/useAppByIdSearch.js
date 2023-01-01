import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import gql from 'graphql-tag';

export const SEARCH_APP_BY_ID_QUERY = gql`
    query($name: String!){
        getAppByName(name: $name){
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

// export const SEARCH_APP_BY_ID_QUERY = gql`
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

const useAppByIdSearch = (name) => {
    const [app, setApp] = useState("");

    const [search, {loading, error, data}] = useLazyQuery(SEARCH_APP_BY_ID_QUERY);
     
    useEffect(() => {
        console.log("id#@#@#@#", name);
        console.log("type of id#@#@#@#", typeof name);
        // if(!id){
        //     setApp({});
        //     return;
        // }
    console.log("variables: ", { 
        variables: 
          { name: name } 
        });
        search({ 
            variables: 
              { name } 
            })
         
    }, [name]);

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