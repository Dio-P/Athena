import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export const UPDATE_APP_BY_ID = gql`
  mutation ($id: ID!, $app: AppInput!) {
    updateAppById(id: $id, app: $app) {
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

const useUpdateAppById = (id, app, shouldQuery) => {
  console.log("insideUpdateAppById££££", id, app, shouldQuery);
  const [updateApp, { loading, error, data }] = useMutation(
    UPDATE_APP_BY_ID
  );

  useEffect(() => {
    if(id && app && shouldQuery) {
      console.log("app in Mutation£££££", app);
      updateApp({
        variables: { id: id, app: app },
      });
    }
  }, [id, app, shouldQuery]);

  return [data, loading, error];
};

export default useUpdateAppById;
