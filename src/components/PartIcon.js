import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
padding: 8px;
font: inherit;
cursor: pointer;
outline: inherit;
min-width: 150px;
min-height: 130px;
max-width: 200px;
max-height: 200px;
color: white;
display: flex;
flex-direction: column;
align-content: center;
text-align: center;
background-color: #1D4587;
box-shadow: #2b2a28 0.5em 0.5em 0.3em;
border-radius: 15px 10%;
font-size: 14px;

h4 {
    margin: auto;

}

p {
    margin: 5px;
    margin: auto;
}

a {
    font-size: smaller;
    margin: auto;
    color: #FCABD1;

}
`;
const PartIcon = ({ part, appId }) => {

    const partName = useCapitaliseFirstLetter(part.name);
    const partType = useCapitaliseFirstLetter(part.type);
    const ghRepo = part.ghRepo;
    
    return (
        <PartsContainer>
            <Link 
                to={`/${appId}/${part.id}`}
                // state={part.id}
                > 
                    {/* here get only what you need from mongo */}
                <IconButton>
                    <h4>
                        { partName }
                    </h4>
                    <a href={ghRepo}> ({ghRepo}) </a>
                    <p> type : { partType }</p>
                </IconButton>
            </Link>
        </PartsContainer>
    )
}

export default PartIcon;