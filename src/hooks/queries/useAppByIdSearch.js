import { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import gql from 'graphql-tag';

// export const SEARCH_APP_BY_ID_QUERY = gql`
//     query($name: String!){
//         getAppByName(name: $name){
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

export const SEARCH_APP_BY_ID_QUERY = gql`
    query GetAppById($getAppByIdId: ID!) {
        getAppById(id: $getAppByIdId) {
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
    const [thisName, setThisName] = useState("");
    const [appToDisplay, setAppToDisplay] = useState("");

    const [searchApp, {loading, error, data}] = useLazyQuery(SEARCH_APP_BY_ID_QUERY);
     useEffect(() => {
        console.log("name set");
        setThisName(id)
     }, [id]);
     useEffect(() => {
        console.log("app last@@@@", appToDisplay);
     }, [appToDisplay]);
     useEffect(() => {
        console.log("thisName is:", thisName);
     }, [thisName]);
    useEffect(() => {
        console.log("id#@#@#@#", thisName);
        console.log("type of id#@#@#@#", typeof thisName);
        if(!thisName){
            setAppToDisplay({});
            return;
        }
        if(thisName){
            console.log("thisName@@@", thisName);
            console.log("variables: ", { 
                variables: 
                  { id: thisName } 
                });
            const test = thisName.toString()
                searchApp({ 
                    variables: 
                      { id: thisName } 
                    })
        }
         
    }, [thisName]);

    useEffect(() => {
        console.log("data*!", data);
        console.log("data.getAppByName*!", data?.getAppById);
        if(data && data.getAppById){
            const newApp = data.getAppById;
            console.log("newApp", newApp);
            setAppToDisplay({...newApp});
        };
    }, [data]);

    return [appToDisplay, loading, error ];
}

export default useAppByIdSearch

// 63b06e8a723b10add8b09aa1
// 63b06e8a723b10add8b09aa1