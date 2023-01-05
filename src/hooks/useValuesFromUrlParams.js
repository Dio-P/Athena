import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


const useValuesFromUrlParams = (updatedParams) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [valuesFromUrl, setValuesFromUrl] = useState("");
  // const paramValues = useCallback
  useEffect(() => {
    const paramValues = Object.fromEntries([...searchParams]);
    console.log("paramValues!@£", paramValues);
    setValuesFromUrl(paramValues)
  }, [])

  useEffect(() => {
    console.log("useValuesFromUrlParams", searchParams, updatedParams);
    if(updatedParams){
      setSearchParams(updatedParams)
    }

  }, [updatedParams]);

  useEffect(() => {
    console.log("valuesFromUrl@@@", valuesFromUrl);
  }, [valuesFromUrl]);
  
  // useEffect(() => {
  //   const paramValues = Object.fromEntries([...searchParams]);
  //   setValuesFromUrl(paramValues)

  // }, [searchParams])

  return [valuesFromUrl.team, valuesFromUrl.appId]
}

export default useValuesFromUrlParams;