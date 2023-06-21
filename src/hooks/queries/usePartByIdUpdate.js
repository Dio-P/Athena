import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export const UPDATE_PART_BY_ID_QUERY = gql`
  mutation ($id: String!, $updatedPart: PartInput!) {
    updatePartById(id: $id, updatedPart: $updatedPart ) {
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

const usePartByIdUpdate = (id, updatedPart, shouldMutate) => {

  const [updatePart, { loading, error, data }] = useMutation(
    UPDATE_PART_BY_ID_QUERY
  );

  useEffect(() => {
    console.log("data@!@", data);
  }, [data])

  useEffect(() => {
    console.log("inside uef");
    if (id && updatedPart && shouldMutate){
      console.log("inside if@", id, updatedPart, shouldMutate);
      updatePart({
        variables: { id: id, updatedPart: updatedPart  },
      });
    }
  }, [id, updatedPart, shouldMutate]);

  return {editPartMutation: {data, loading, error}};
  // return [data, loading, error];
};

export default usePartByIdUpdate;
