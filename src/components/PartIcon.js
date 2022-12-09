import styled from "@emotion/styled";

const PartsContainer = styled.div`
    display: flex
`;

const Icon = styled.button`
margin: auto;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;

display: flex;
align-content: center;
background-color: #e6056e;
width: 90%;
height: 90%;
box-shadow: #2b2a28 0.5em 0.5em 0.3em;
border-radius: 15px 10%;
margin: 20px;
font-size: 14px;
`;

// min-width: 100px;
// min-height: 50px;
// max-width: 140px;
// max-height: 60px;

const PartIcon = ({ part }) => {
    return (
        <PartsContainer>
            <Icon>
                <h4>
                    { part.name }
                </h4>
                <p>{ part.type }</p>
                <p> gitHub: { part.ghRepo }</p>

            </Icon>
        </PartsContainer>
    )
}

export default PartIcon;