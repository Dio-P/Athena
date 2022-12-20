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
    background-color: #1D4587;
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
    text-align: center;
    margin: auto;
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
    const DocIconContainer = (iconNu%2===0)? EvenIconContainerWrapper : OddIconContainerWrapper;

    // useEffect(() => {
    //     console.log("iconNu", iconNu);
    // }, [iconNu])

    // const count = useMemo(() => {iconNu()}, [iconNu]);

    return (
        <DocIconContainer>
            <IconContainer>
                <div>{iconNu}</div>
                <div> {docTitle} </div>
            </IconContainer>
        </DocIconContainer>
    )
}

export default DocIcon;

// make that one taking the full page length, and all the info horizontal