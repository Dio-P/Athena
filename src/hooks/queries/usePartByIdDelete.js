import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export const DELETE_PART_BY_ID_MUTATION = gql`
  mutation ($id: String!) {
    deletePartById(id: $id) {
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

const usePartByIdDelete = (id, shouldDelete) => {
  const [deletePart, { loading, error, data }] = useMutation(
    DELETE_PART_BY_ID_MUTATION
  );

  useEffect(() => {
    if(data){
      console.log("data@!@", data);
    }
  }, [data])

  useEffect(() => {
    if (id && shouldDelete){
      console.log("inside uef");
      deletePart({
        variables: { id: id },
      });
    }
  }, [id, shouldDelete]);

  return {data, loading, error};
}

export default usePartByIdDelete;