import { useMemo, useState } from "react";


export const useSearchBar = (data) => {
  const [searchingQuery, setSearchingQuery] = useState(undefined);
  const allData= useMemo(() => data, [data])

  const filteredData = useMemo(
    () => allData.filter((folder) => folder.name.includes(searchingQuery)),
    [searchingQuery]
  );

  const search = (e) => {
    setSearchingQuery(e.target.value);
  };

   

  return {search, searchingQuery, filteredData};
}

