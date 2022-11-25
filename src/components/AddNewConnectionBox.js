import { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import findConnectionParameters from "../helpers/findConnectionParameters";
import FolderIcon from "./FolderIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";

const DisplayBox = styled.div`
        margin: 10px;
        border: solid black;
        border-radius: 15px;
        background-color: Fffcfa;
        box-shadow: #2b2a28 0.5em 0.5em 0.3em;
        zIndex: 1;
        width: 90%;
        height: 100%;
    `;

const FormContainer = styled.form`
    margin: 6px;

`;

const TitleButtonWrapper = styled.div`
    display: 'flex';
    flex-direction: row;
`;

const InputContainer = styled.div`
    text-align: center;
    margin-top: 4px;
    border: solid black;
    border-radius: 10px;
    padding: 1px 2px;
    width: 95%;
    min-height: 20px;
    height: 100%;
    margin: 1em;
`;

const Input = styled.input`
    width: 95%; 
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
    const [iconClicked, setIconClicked] = useState(false);

    const [allAppParts, setAllAppParts] = useState([]);
    const [appPart, setAppPart] = useState({});
    const [newPartName, setNewPartName] = useState("");
    const [appPartsConcernedWithNewDoc, setAppPartsConcernedWithNewDoc] = useState("");
    // const [setOfClickedParts, setSetOfClickedParts] = useState({});
    const [appPartInputOpen, setAppPartInputOpen] = useState(false);
    
    const [allFolders, setAllFolders] = useState([])
    const [folderName, setFolderName] = useState("");
    const [folderInputOpen, setFolderInputOpen] = useState(false);

    const [addnewFolderInputOpen, setAddnewFolderInputOpen] = useState(false);
    const [newFolder, setNewFolder] = useState("")

    const [part, setPart] = useState("")
    const [newDoc, setNewDoc] = useState("");
    let nuOfNewFolder;
    const allAppPartsHelper = {}
    const appName = useCapitaliseFirstLetter(app.name);

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
        app.includesParts.map((part) => {
            allAppPartsHelper[part.name]= part
            allAppPartsHelper[part.name].clicked = false
        });
        setAllAppParts(allAppPartsHelper);
    }, [app]);

    useEffect(() => {
        console.log("allAppPartsHelper", allAppPartsHelper); 
        console.log("allAppParts", allAppParts); 
    }, [allAppParts])

    const addhasBeenClicked = async(e) => {
        e.preventDefault()
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
            concerningParts: appPartsConcernedWithNewDoc,
            isLinkUpToDate: true, //tickbox checked
        }

        // if(){

        // }
        // setAllFolders([...allFolders, {[nuOfNewFolder]: folderName}])
        setNewDoc(newDoc)
    }

    const addNewAppPartClicked = () => {
        setAppPartInputOpen(!appPartInputOpen);
    }

    const addNewFolderClicked = () => {
        setAddnewFolderInputOpen(!addnewFolderInputOpen);
    }

    const folderIconClicked = (folder) => {
        setFolderName(folder);
    }

    const partIconClicked = (part) => {
        console.log("part icon clicked");
        console.log("allAppParts**", allAppParts);
        console.log("part!!!", part);
        // let clicked = !part.clicked;
        // console.log("clicked!!!", clicked); 
        setAllAppParts({
            ...allAppParts, [part.name]: { 
                ...allAppParts[part.name], 
                clicked: !part.clicked}});
        // if(Object.keys(setOfClickedParts).includes(part.name)){
        //     delete setOfClickedParts[part.name]
        // }else {
        //     setSetOfClickedParts({...setOfClickedParts, [part.name]: part})
        // }
        // setAppPartsConcernedWithNewDoc([...appPartsConcernedWithNewDoc, part]);
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
        <DisplayBox>
            <FormContainer>
                <div>
                    <InputContainer>
                        <label htmlFor="">URL</label>
                        <Input key={"urlInput"} type="text" name="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                    </InputContainer>
                    <div>
                        <p>Choose an app part and display folder</p>
                       
                        { !appPartInputOpen?
                            <>
                            <label htmlFor="">Existing {appName} Parts</label>
                            {Object.values(allAppParts).map((part)=> (
                                <div onClick={()=> partIconClicked(part) }>
                                    <FolderIcon
                                        part={part.name}
                                        clicked={allAppParts[part.name].clicked}
                                        > 
                                        { part }
                                    </FolderIcon>
                                </div>
                            ))}
                            <div onClick={()=>addNewAppPartClicked()}>
                                <FolderIcon   
                                    addingButton={true}
                                    buttonTitle={`+ Add ${appName} Part`}
                                />
                            </div>
                            </>
                        :
                        <>
                            <TitleButtonWrapper>
                                <div onClick={()=>addNewAppPartClicked()}>
                                    <FolderIcon   
                                        addingButton={true}
                                        buttonTitle={`- back`}
                                        />
                                </div>
                                <p>New Part</p> 
                            </TitleButtonWrapper>
                            <DisplayBox>
                            
                                <InputContainer>
                                    <label htmlFor=""> New Part Name: {newPartName}</label>
                                    <Input 
                                        key={"newFolderInput"}
                                        type="text" 
                                        name="newFolder"
                                        value={newPartName}
                                        onChange={(e)=> setNewPartName( e.target.value)}
                                    />
                                </InputContainer>
                                <p> Folder to display new part in</p>
                                <>
                                    { addnewFolderInputOpen?
                                        allFolders.map((folder)=> (
                                            <FolderIcon 
                                                folder={ folder } 
                                                onClick={ (folder)=> setFolderName(folder) } 
                                                > 
                                                { folder }
                                            </FolderIcon>
                                        ))
                                    :
                                        <>
                                            <InputContainer>
                                                <label> New Folder Name: {folderName} </label>
                                                <Input 
                                                    key={"newFolderInput"}
                                                    type="text" 
                                                    name="newFolder" 
                                                    value={folderName} 
                                                    onChange={(e)=> setFolderName(e.target.value)}
                                                />
                                            </InputContainer>
                                        </>
                                    }
                                    <div onClick={()=>addNewFolderClicked()}>
                                    <FolderIcon   
                                        addingButton={true}
                                        buttonTitle={ addnewFolderInputOpen? "+ Add New Folder" : "- Close"}
                                    />
                                    </div>
                                </>
                            </DisplayBox>
                        </> 
                        }
                        
                    </div>
                        {/* {
                        (url && folderName && part)
                        ? */}
                            <button type="submit" onClick={addhasBeenClicked}>Add</button>
                        {/* :
                            <button onClick>Add</button>
                        } */}
                        
                        {/* {url
                        &&
                            <UrlInputBox onClick={addhasBeenClicked}>
                                {`add: ${url}`}
                            </UrlInputBox>
                        } */}
                </div>
            </FormContainer>
        </DisplayBox>

    )
}

export default AddNewConnectionBox;