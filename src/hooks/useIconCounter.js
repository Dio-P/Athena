import { useEffect, useState } from "react";


const useIconCounter = ({time}) => {
  const [iconNu, setIconNu] = useState(0);

  useEffect(() => {
    setIconNu(+1)
  }, [time])

  return iconNu
}

export default useIconCounter