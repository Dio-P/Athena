import styled from "@emotion/styled";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const PartsContainer = styled.div`
    display: flex
`;

const IconButton = styled.button`
background: none;
color: inherit;

margin: auto;
margin-bottom: 20px;
border: none;
padding: 10px;
font: inherit;
cursor: pointer;
outline: inherit;
min-width: 100px;
min-height: 170px;
max-width: 140px;
max-height: 60px;
color: white;
display: flex;
flex-direction: column;
align-content: center;
background-color: #6c98e0;
width: 90%;
height: 90%;
box-shadow: #2b2a28 0.5em 0.5em 0.3em;
border-radius: 15px 10%;
font-size: 14px;
`;

const PartIconButton = ({ part }) => {
    const partName = useCapitaliseFirstLetter(part.name);
    const partType = useCapitaliseFirstLetter(part.type);
    const ghRepo = useCapitaliseFirstLetter(part.ghRepo);
    return (
        <PartsContainer>
            <IconButton>
                <h4>
                    { partName }
                </h4>
                <p>type : { partType }</p>
                <p> gitHub: { ghRepo }</p>

            </IconButton>
        </PartsContainer>
    )
}

export default PartIconButton;