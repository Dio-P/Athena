import styled from "@emotion/styled";
import { useEffect, useMemo } from "react";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const OddIconContainerWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  width: 100%;
  height: 60px;
  padding: 3px;
  color: white;
  border-radius: 2%;
  outline: solid black;
  background-color: #1d4587;
`;

const EvenIconContainerWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  width: 100%;
  height: 60px;
  padding: 3px;
  color: white;
  border-radius: 2%;
  outline: solid black;
  background-color: green;
`;

const IconContainer = styled.div`
  display: flex;
  align-content: center;
  margin: auto;
`;

const DocSingularInfoContainer = styled.div`
  text-align: center;
  margin: 5px;

`;

const DocIcon = ({ doc, iconNu }) => {
  const { name, url, source, lastModified, concerningParts } = doc;

  const docTitle = useCapitaliseFirstLetter(name);
  const docSource = useCapitaliseFirstLetter(source);
  const DocIconContainer =
    iconNu % 2 === 0 ? EvenIconContainerWrapper : OddIconContainerWrapper;

  useEffect(() => {
      console.log("iconNu", iconNu);
      console.log("doc", doc);
  }, [doc, iconNu])

  // const count = useMemo(() => {iconNu()}, [iconNu]);

  return (
    <DocIconContainer>
      <IconContainer>
        <DocSingularInfoContainer>
            {iconNu}
        </DocSingularInfoContainer>
        <DocSingularInfoContainer>
          <a href={url}>{docTitle}</a>
        </DocSingularInfoContainer>
      </IconContainer>
    </DocIconContainer>
  );
};

export default DocIcon;

// add the logic that will take the part id's that it concerns and return the titles