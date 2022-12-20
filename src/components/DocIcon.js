import styled from "@emotion/styled";


const DocIcon = ({ doc }) => {

    const DocIconContainer = styled.div`
        display: flex;
        width: 100%;
        height: 20px;
    `;

    return (
        <DocIconContainer>
            <p> {doc.title} </p>
        </DocIconContainer>
    )
}

export default DocIcon;

// make that one taking the full page length, and all the info horizontal