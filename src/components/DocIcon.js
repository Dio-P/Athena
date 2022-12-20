import styled from "@emotion/styled";

const DocIconContainer = styled.div`
display: flex;
width: 100%;
height: 20px;
`;

const DocIcon = ({ doc }) => {
    const {
        title,
        url,
        source,
        lastModified,
        concerningParts
    } = doc

    return (
        <DocIconContainer>
            <p> {title} </p>
        </DocIconContainer>
    )
}

export default DocIcon;

// make that one taking the full page length, and all the info horizontal