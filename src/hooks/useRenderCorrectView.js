import { useMemo } from "react";
import { useEffect, useState } from "react";

const useRenderCorrectView = (loading, error, data, view) => {
  const [renderingView, setRenderingView] = useState(undefined);

  const viewMemo = useMemo(() => view, [view]);

  const loadingMemoTrue = useMemo(() => !!loading, [loading]);
  const errorMemoTrue = useMemo(() => !!error, [error]);
  const dataMemoTrue = useMemo(() => !!data, [data]);

  useEffect(() => {
    if (loadingMemoTrue) {
      setRenderingView(<h3>Loading...</h3>);
    }
    if (errorMemoTrue) {
      setRenderingView(
        <p>
          I am sad to say that the following error was just reported :
          {JSON.stringify(error)}
        </p>
      );
    }
    if (dataMemoTrue) {
      setRenderingView(view);
    }
  }, [loading, error, data])
  
  return renderingView;

};

export default useRenderCorrectView;
