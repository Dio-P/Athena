import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const SEARCH_APP_BY_ID_WITH_FOLDERS_QUERY = gql`
  query ($id: ID!) {
    getAppWithFoldersById(id: $id) {
      id
      name
      type
      gitHubRepo
      briefDescr
      folders {
        name
        id
        parts {
          name
          id
          ghRepo
          type
          folderToBeDisplayedIn
          docs {
            name
            url
            id
            source
            lastModified
            concerningParts
          }
        }
      }
    }
  }
`;

const useAppWithFolderByIdSearch = (id) => {
  const [appToDisplay, setAppToDisplay] = useState("");

  const [searchApp, { loading, error, data }] = useLazyQuery(
    SEARCH_APP_BY_ID_WITH_FOLDERS_QUERY
  );

  useEffect(() => {
    searchApp({
      variables: { id: id },
    });
  }, [id]);

  useEffect(() => {
    if (data && data.getAppWithFoldersById) {
      const newApp = data.getAppWithFoldersById;
      setAppToDisplay({ ...newApp });
    }
  }, [data]);

  return [appToDisplay, loading, error];
};

export default useAppWithFolderByIdSearch;
