import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import DocIcon from "../components/DocIcon";
import usePartByIdSearch from "../hooks/queries/usePartByIdSearch";

const PartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SinglePartPage = () => {
  let { appId, partId } = useParams();

  let iconNu = 0;

  const [partToDisplay, loading, error] = usePartByIdSearch(partId);

  const render = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return (
        <>
          <p>I am sad to say that the following error was just reported :</p>
          <p>{JSON.stringify(error)}</p>
        </>
      );
    }
    if (partToDisplay.docs) {
      return partToDisplay.docs.map((doc) => {
        iconNu++;
        return <DocIcon doc={doc} iconNu={iconNu} />;
      });
    }
  };

  return <PartPageContainer>{render()}</PartPageContainer>;
};

export default SinglePartPage;
