import { useEffect, useState } from "react"


const useCapitaliseFirstLetter = (word) => {
  const [capitalisedWord, setCapitalisedWord] = useState('')
  
  // useEffect(() => {
  //   setWordToCapitalise(word) 
  // }, [word])
  
  useEffect(() => {
    console.log("word", word);
    console.log("word.charAt(0).toUpperCase()+ word.slice(1)", word.charAt(0).toUpperCase() 
    + word.slice(1));
    setCapitalisedWord(
      word.charAt(0).toUpperCase() 
      + word.slice(1)
    ); 
  }, [word])

  return capitalisedWord? capitalisedWord : "loading"
}

export default useCapitaliseFirstLetter;