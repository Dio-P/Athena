import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const SEARCH_PART_BY_ID_QUERY = gql`
  query ($id: ID!) {
    getPartById(id: $id) {
      name
      id
      ghRepo
      type
      folderToBeDisplayedIn
      appParent
      docs
    }
  }
`;

const usePartByIdSearch = (id) => {
  const [partToDisplay, setPartToDisplay] = useState("");

  const [searchPart, { loading, error, data }] = useLazyQuery(
    SEARCH_PART_BY_ID_QUERY
  );

  useEffect(() => {
    console.log("id", id);/////

    searchPart({
      variables: { id: id },
    });
  }, [id]);

  useEffect(() => {
    if (data && data.getPartById) {
      const part = data.getPartById;
      setPartToDisplay({ ...part });
    }
  }, [data]);

  return [partToDisplay, loading, error];
};

export default usePartByIdSearch;
