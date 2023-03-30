import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const SEARCH_APP_BY_ID_QUERY = gql`
  query ($id: ID!) {
    getAppById(id: $id) {
      name
      id
      type
      gitHubRepo
      briefDescr
      folders {
        name
        id
      }
      parts {
        name
        id
        ghRepo
        type
        folderToBeDisplayedIn
      }
      teams
      properties {
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
`;

const useAppByIdSearch = (id, shouldQuery) => {
  const [appToDisplay, setAppToDisplay] = useState("");

  const [searchApp, { loading, error, data }] = useLazyQuery(
    SEARCH_APP_BY_ID_QUERY
  );

  useEffect(() => {
    if(id && shouldQuery) {
      searchApp({
        variables: { id: id },
      });
    }
  }, [id, shouldQuery]);

  useEffect(() => {
    if (data && data.getAppById) {
      const newApp = data.getAppById;
      setAppToDisplay({ ...newApp });
    }
  }, [data]);

  return [appToDisplay, loading, error];
};

export default useAppByIdSearch;
