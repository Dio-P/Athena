const mockAppByFoldersMutation = {
  id:"63d7f613fac7d7bdf43ea344",
  name:"optimo",
  type:"app",
  gitHubRepo:"someLink.github.com",
  briefDescr:"this is the optimo app, the best app in the world",
  folders:[
     {
        name:"general documentation",
        id:0,
        parts:[
           {
              name:"general documentation",
              id:"somePartId1",
              ghRepo:"www.someGitHubLink.com",
              type:"documentation",
              folderToBeDisplayedIn: 0,
              docs:[
                 {
                    name:"Some Doc1",
                    url:"https://someLink.com",
                    id:"someDocId",
                    source:"Confluence",
                    lastModified:"someDate",
                    concerningParts:[
                       "somePartId1",
                       "somePartId2"
                    ]
                 },
                 {
                    name:"Some Doc2",
                    url:"https://someLink.com",
                    id:"someDocId",
                    source:"Confluence",
                    lastModified:"someDate",
                    concerningParts:[
                       "somePartId1",
                       "somePartId2"
                    ]
                 }
              ]
           }
        ]
     },
     {
        name:"client",
        id:1,
        parts:[
           {
              name:"published postgres",
              id:"somePartId2",
              ghRepo:"www.someGitHubLink.com",
              type:"data base",
              folderToBeDisplayedIn:1,
              docs:[
                 {
                    name:"Some Doc1",
                    url:"https://someLink.com",
                    id:"someDocId",
                    source:"Confluence",
                    lastModified:"someDate",
                    concerningParts:[
                       "somePartId1",
                       "somePartId2"
                    ]
                 },
                 {
                    name:"Some Doc2",
                    url:"https://someLink.com",
                    id:"someDocId",
                    source:"Confluence",
                    lastModified:"someDate",
                    concerningParts:[
                       "somePartId1",
                       "somePartId2"
                    ]
                 }
              ]
           }
        ]
     },
     {
        name:"server",
        id:2,
        parts:[
           
        ]
     }
  ]
};

export default mockAppByFoldersMutation;