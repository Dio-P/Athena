import { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";

const AddingConnectionBox = styled.div`
        margin: 10px;
        border: solid black;
        zIndex: 1;
        width: 1000px;
        height: 500px;
    `;

    const FormContainer = styled.form`
    
    `;

const AddNewConnectionBox = () => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        console.log("url", url);
    }, [url]);

    // const onChangeFired = useCallback((e) => {
    //     setUrl(e.target.value) 
    // }, [])

    return (
        <AddingConnectionBox>
            <FormContainer>
                <div>
                    <label htmlFor="">URL</label>
                    <input type="text" name="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </div>
            </FormContainer>
        </AddingConnectionBox>

    )
}

export default AddNewConnectionBox;