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