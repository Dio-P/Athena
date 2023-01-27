import { useEffect, useState } from "react";

const useRenderCorrectView = (loading, error, data, view) => {
  const [renderingView, setRenderingView] = useState(undefined);

  useEffect(() => {
    if (loading) {
      setRenderingView(<h3>Loading...</h3>);
    }
    if (error) {
      setRenderingView(
        <p>
          I am sad to say that the following error was just reported :
          {JSON.stringify(error)}
        </p>
      );
    }
    if (data) {
      console.log('data£££', data);
      setRenderingView(view);
    }
  }, [loading, error, data])
  
  return renderingView;

};

export default useRenderCorrectView;
