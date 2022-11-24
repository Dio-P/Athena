import { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import findConnectionParameters from "../helpers/findConnectionParameters";
import FolderIcon from "./FolderIcon";

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
    text-align: center;
    margin-top: 4px;
    border: solid black;
    border-radius: 10px;
    padding: 1px 2px;
    width: 99%;
    min-height: 20px;
    height: 100%;
`;

const Input = styled.input`
    width: 100%; 
    border: solid black;
    border-radius: 8px;
    border-radius: 10px;
    min-width: 200px;
    min-height: 20px;
    height: 24px;
    text-align: center;
    cursor: text;
    margin: 0em;
    padding: 0px;
    border-width: 0px;
`;

const UrlInputBox = styled.div`
    text-align: center;
    color: #b5b4ac;
    cursor: pointer;
    margin: 3px;
`;

const AddNewConnectionBox = ({ app }) => {
    const [url, setUrl] = useState("");

    const [allAppParts, setAllAppParts] = useState([]);
    const [appPart, setAppPart] = useState({});
    const [newAppName, setNewAppName] = useState("");
    const [appPartInputOpen, setAppPartInputOpen] = useState(false);
    
    const [allFolders, setAllFolders] = useState([])
    const [folderName, setFolderName] = useState("");
    const [folderInputOpen, setFolderInputOpen] = useState(false);

    const [addnewFolderInputOpen, setAddnewFolderInputOpen] = useState(false);
    const [newFolder, setNewFolder] = useState("")

    const [part, setPart] = useState("")
    const [newDoc, setNewDoc] = useState("");
    let nuOfNewFolder;

    if(allFolders){
        nuOfNewFolder = allFolders.length +2;
    }

    useEffect(() => {
        console.log("newDoc", newDoc);
    }, [newDoc]);

    useEffect(() => {
        console.log("app@", app);
        setAllFolders(app.foldersToDisplay.map((folder)=>(
            Object.values(folder)[0]
        )));
        setAllAppParts(app.includesParts.map((part)=>(
            part.name
        )));
    }, [app]);

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
            folderToBeDisplayedIn: "1",
            concerningParts: [],
            isLinkUpToDate: true, //tickbox checked
        }
        setAllFolders([...allFolders, {[nuOfNewFolder]: folderName}])
        setNewDoc(newDoc)
    }

    const addNewAppPartClicked = () => {
        setAppPartInputOpen(!appPartInputOpen);
    }

    const addNewFolderClicked = () => {
        setAddnewFolderInputOpen(!addnewFolderInputOpen);
    }

    const folderInputClicked = () => {
        setFolderInputOpen(!folderInputOpen);
    }

    const addingNewFolder = (value) => {
        setFolderName(value)
        //  setNewFolder(
        //     {
        //         [nuOfNewFolder]: value
        //     });
    }

    return (
        <AddingConnectionBox>
            <FormContainer>
                <div>
                    <label htmlFor="">URL</label>
                    <InputContainer>
                        <Input key={"urlInput"} type="text" name="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                    </InputContainer>
                    <div>
                        <p>Choose an app part and display folder</p>
                       
                        <div onClick={()=>addNewAppPartClicked()}>+ Add (app name) Part</div>
                            { !appPartInputOpen?
                                <>
                                {allAppParts.map((part)=> (
                                    <FolderIcon part={part} > { part }</FolderIcon>
                                ))}
                                </>
                            :
                            <>
                                <InputContainer>
                                    <Input key={"newFolderInput"} type="text" name="newFolder" value={newAppName} onChange={(e)=> setNewAppName(e.target.value)}/>
                                </InputContainer>
                                <p> Folder to display App in</p>
                                <>
                                    {allFolders.map((folder)=> (
                                        <FolderIcon folder={ folder }> { folder }</FolderIcon>
                                    ))}
                                </>
                                <>
                                    <div onClick={()=>addNewFolderClicked()}>+ Add Folder</div>
                                    { addnewFolderInputOpen
                                    &&
                                    <InputContainer>
                                        <Input key={"newFolderInput"} type="text" name="newFolder" value={folderName} onChange={(e)=> setFolderName(e.target.value)}/>
                                    </InputContainer>
                                    }
                                </>
                            </> 
                        }
                    </div>
                        {
                        (url && folderName && part)
                        ?
                            <button onClick={addhasBeenClicked}>Add</button>
                        :
                            <button>Add</button>
                        }
                       
                        {/* {url
                        &&
                            <UrlInputBox onClick={addhasBeenClicked}>
                                {`add: ${url}`}
                            </UrlInputBox>
                        } */}
                </div>
            </FormContainer>
        </AddingConnectionBox>

    )
}

export default AddNewConnectionBox;