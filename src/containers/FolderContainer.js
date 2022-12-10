import styled from "@emotion/styled";
import PartIcon from "../components/PartIcon";
const DocsContainer = styled.div`
    display: flex;

`;

const FolderContainer = ({folder}) => {
    return (
        <DocsContainer>
            <PartIcon/>
        </DocsContainer>
    )
}

export default FolderContainer;

// need to work on seperating the parts into folders and then having the folders be expandable on click
// I need to fix the logic that displayes the correct folder on the addNewPage