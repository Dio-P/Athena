import { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import findConnectionParameters from "../helpers/findConnectionParameters";

const AddingConnectionBox = styled.div`
        margin: 10px;
        border: solid black;
        zIndex: 1;
        width: 1000px;
        height: 500px;
    `;

const FormContainer = styled.form`
    margin: 6px;

`;

const InputContainer = styled.div`
    margin-top: 4px;
    border: solid black;
    border-radius: 10px;
    padding: 1px 2px;
    min-width: 200px;
    max-width: 99%;
    width: max-content;    ;
    min-height: 20px;
    height: 100%
    border-radius: 15px 10%;
`;

const Input = styled.input`
    border-radius: 8px;
    min-width: 200px;
    width: 100%; 
    height: 24px;
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
    text-align: center;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 0px;
    border-width: 0px;
    border-style: inset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
`;

const UrlInputBox = styled.div`
    text-align: center;
    color: #b5b4ac;
    cursor: pointer;
    margin: 3px;
`;

const AddNewConnectionBox = () => {
    const [url, setUrl] = useState("");
    const [newDoc, setNewDoc] = useState("");

    useEffect(() => {
        console.log("url", url);
    }, [url]);

    useEffect(() => {
        console.log("newDoc", newDoc);
    }, [newDoc]);

    const addhasBeenClicked = async() => {
        console.log("add has been clicked ");
        const {
            title,
            source
        } = await findConnectionParameters(url);
        const newDoc = {
            title: title,
            url: url,
            source: source,
            lastModified: "someDate",
            folderToBeDisplayedIn: "folder1",
            concerningParts: [],
            isLinkUpToDate: true, //tickbox checked
        }
        setNewDoc(newDoc)
    }

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
                            <UrlInputBox onClick={addhasBeenClicked}>
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