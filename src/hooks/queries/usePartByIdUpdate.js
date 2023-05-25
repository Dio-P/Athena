import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const Update_PART_BY_ID_QUERY = gql`
  mutation (id: String!, updatedPart: PartInput!) {
    updatePartById(id: $id, updatedPart: $updatedPart ) {
      name
      id
      ghRepo
      type
      folderToBeDisplayedIn
      appParent
      docs{
        name,
        url,
        id,
        source,
        lastModified,
        concerningParts,
      }
    }
  }
`;

const usePartByIdUpdate = (id, updatedPart) => {
  // const [partToUpdate, setPartToUpdate] = useState("");

  const [updatePart, { loading, error, data }] = useMutation(
    Update_PART_BY_ID_QUERY
  );

  useEffect(() => {
    updatePart({
      variables: { id: id, updatedPart: updatedPart  },
    });
  }, [id, updatedPart]);

  // useEffect(() => {
  //   if (data && data.updatePartById) {
  //     const part = data.updatePartById;
  //     setPartToUpdate({ ...part });
  //   }
  // }, [data]);
  return [data, loading, error];
};

export default usePartByIdUpdate;
