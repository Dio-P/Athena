import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import GenericButtonIcon from "./GenericButtonIcon";
import { moreIcon } from "../helpers/svgIcons";
import AdditionalOptions from "./AdditionalOptions";
import PopUp from "./PopUp";
import EditPart from "../popUpComponents/EditPart";

const PartsContainer = styled.div`
    display: flex
`;

const MoreIconContainer = styled.div`
    width: 20px;
`;

const WholeBoxContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    padding: 8px;
    min-width: 150px;
    min-height: 130px;
    max-width: 200px;
    max-height: 200px;
    background-color: #1D4587;
    box-shadow: #2b2a28 0.5em 0.5em 0.3em;
    border-radius: 15px 10%;
    
`;

const IconButton = styled.div`
    cursor: pointer;
    color: white;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    font-size: 14px;

    h4 {
        margin: 15px;

    }

    p {
        margin: 15px;
    }

    a {
        font-size: smaller;
        margin: auto;
        color: #FCABD1;
        text-decoration: none;


}
`;
const PartIcon = ({ part, appId, folders }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [moreOptionOpen, setMoreOptionsOpen] = useState(false);

    const partName = capitaliseFirstLetters(part.name);
    const partType = capitaliseFirstLetters(part.type);
    const ghRepo = part.ghRepo;

    const editPart = () => {
        console.log("hello");
        setEditOpen(true);
    }
    
    return (
        <WholeBoxContainer>
            <IconButton>
                <Link 
                    to={`/${appId}/${part.id}`}
                    // state={part.id}
                    > 
                    <IconButton>
                        <h4>
                            { partName }
                        </h4>
                        <div href={ghRepo}> ({ghRepo}) </div>
                        <p> type : { partType }</p>

                    </IconButton>
                </Link>
                <GenericButtonIcon
                    type="small"
                    icon={moreIcon}
                    onClickFunction={()=> setMoreOptionsOpen(!moreOptionOpen)}
                />
                {moreOptionOpen &&
                    <AdditionalOptions
                        options={[
                            {
                                title: "edit",
                                onClickFunction: editPart
                            },
                        ]}
                    />
                }
                {editOpen &&
                    <PopUp
                        setIsPopUpOpen={setEditOpen}
                        ComponentToDisplay={EditPart}
                        part={part}
                        folders={folders}
                    />
                }
            </IconButton>
        </WholeBoxContainer>
    )
}

export default PartIcon;