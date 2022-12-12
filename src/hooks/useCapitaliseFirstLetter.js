import { useEffect, useState } from "react"


const useCapitaliseFirstLetter = (word) => {
  const [capitalisedWord, setCapitalisedWord] = useState('')
  
  useEffect(() => {
    if(word){
      setCapitalisedWord(
        word.charAt(0).toUpperCase() 
        + word.slice(1)
      ); 
    }
  }, [word])

  return capitalisedWord? capitalisedWord : "..."
}

export default useCapitaliseFirstLetter;