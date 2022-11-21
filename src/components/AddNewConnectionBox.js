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

const UrlInputBox = styled.div`

`;

const InputContainer = styled.div`
    border: solid black;
    border-width: 2px;
    padding: 1px 2px;
    width: 200px;
    min-height: 20px;
    height: 100%
`;

const Input = styled.input`
    writing-mode: horizontal-tb !important;
    font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-weight: ;
    font-stretch: ;
    font-size: ;
    font-family: ;
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 2px;
    border-width: 0px;
    border-style: inset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
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
                    <InputContainer>
                        <Input type="text" name="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                        {url
                        &&
                            <UrlInputBox>
                                {`add: ${url}`}
                            </UrlInputBox>
                        }
                    </InputContainer>
                </div>
            </FormContainer>
        </AddingConnectionBox>

    )
}

export default AddNewConnectionBox;