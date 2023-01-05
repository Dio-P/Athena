import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


const useValuesFromUrlParams = (updatedParams) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [valuesFromUrl, setValuesFromUrl] = useState("");
  useEffect(() => {
    console.log("useValuesFromUrlParams", searchParams);
    console.log("useValuesFromUrlParams on mount");

  }, [])

  useEffect(() => {
    console.log("useValuesFromUrlParams", searchParams, updatedParams);
    if(updatedParams){
      setSearchParams(updatedParams)
    }

  }, [updatedParams]);
  
  useEffect(() => {
    const paramValues = Object.fromEntries([...searchParams]);
    setValuesFromUrl(paramValues)

  }, [searchParams])

  return valuesFromUrl
}

export default useValuesFromUrlParams;