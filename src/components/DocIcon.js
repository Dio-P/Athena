import styled from "@emotion/styled";
import { useEffect, useMemo } from "react";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const OddIconContainer = styled.div`
display: flex;
width: 100%;
height: 60px;
margin: auto;
padding: 3px;
background-color: #1D4587;
`;

const EvenIconContainer = styled.div`
display: flex;
width: 100%;
height: 60px;
margin: auto;
padding: 3px;
background-color: green;
`;

const DocIcon = ({ doc, iconNu }) => {
    const {
        title,
        url,
        source,
        lastModified,
        concerningParts
    } = doc;

    const docTitle = useCapitaliseFirstLetter(title)
    const docSource = useCapitaliseFirstLetter(source)
    const DocIconContainer = (iconNu%2===0)? EvenIconContainer : OddIconContainer;

    // useEffect(() => {
    //     console.log("iconNu", iconNu);
    // }, [iconNu])

    // const count = useMemo(() => {iconNu()}, [iconNu]);

    return (
        <DocIconContainer>
            <div>{iconNu}</div>
            <div> {docTitle} </div>
        </DocIconContainer>
    )
}

export default DocIcon;

// make that one taking the full page length, and all the info horizontal