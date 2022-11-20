import { useEffect, useState } from "react";
import styled from "@emotion/styled";


const AddNewConnectionBox = () => {
    const [url, setUrl] = useState();

    const AddingConnectionBox = styled.div`
        margin: 10px;
        border: solid black;
        zIndex: 1;
        width: 1000px;
        height: 500px;
    `;

    const FormContainer = styled.form`
    
    `;

    useEffect(() => {
        console.log("url", url);
    }, [url]);

    return (
        <AddingConnectionBox>
            <FormContainer>
                <div>
                    <label htmlFor="">URL</label>
                    <input type="text" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </div>
            </FormContainer>
        </AddingConnectionBox>

    )
}

export default AddNewConnectionBox;