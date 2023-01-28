import { useMemo } from "react";
import { useEffect, useState } from "react";

const useRenderCorrectView = (loading, error, data, view) => {
  const [renderingView, setRenderingView] = useState(undefined);

  const loadingMemo = useMemo(() => loading, [loading]);
  const errorMemo = useMemo(() => error, [error]);
  const dataMemo = useMemo(() => data, [data]);
  const viewMemo = useMemo(() => view, [view]);

  useEffect(() => {
    if (loadingMemo) {
      setRenderingView(<h3>Loading...</h3>);
    }
    if (errorMemo) {
      setRenderingView(
        <p>
          I am sad to say that the following error was just reported :
          {JSON.stringify(error)}
        </p>
      );
    }
    if (dataMemo) {
      console.log('data£££', dataMemo);
      setRenderingView(viewMemo);
    }
  }, [loading, error, data])
  
  return renderingView;

};

export default useRenderCorrectView;
