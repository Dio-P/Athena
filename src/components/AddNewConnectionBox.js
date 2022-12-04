import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
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

const OptionsWraper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
margin: auto;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
`;

const NewlyAddedPartButton = styled.button`
margin: auto;
background: none;
color: red;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;


&:hover {
    border: red solid
}
`;

const AddNewConnectionBox = ({ app }) => {
    const [url, setUrl] = useState("");
    const [updatedApp, setUpdatedApp] = useState("");
    const [originalParts, setOriginalParts] = useState("");

    const [allAppParts, setAllAppParts] = useState([]);
    const [newPartName, setNewPartName] = useState("");
    const [newPartGitHubRepo, setNewPartGitHubRepo] = useState("");
    const [newPartType, setNewPartType] = useState("");
    const [appPartsConcernedWithNewDoc, setAppPartsConcernedWithNewDoc] = useState("");
    const [newPartsAdded, setNewPartsAdded] = useState("");
    const [appPartInputOpen, setAppPartInputOpen] = useState(false);
    const [deleteWarningShown, setDeleteWarningShownn] = useState(false);
    
    const [allFolders, setAllFolders] = useState([]);
    const [folderName, setFolderName] = useState("");
    const [newFoldersToBeAddedToAll, setNewFoldersToBeAddedToAll] = useState([]);
    
    const [addnewFolderInputOpen, setAddNewFolderInputOpen] = useState(false);
    const [addNewFolderButtonRendering, setAddNewFolderButtonRendering] = useState(true);
    
    const appName = useCapitaliseFirstLetter(app.name);
    const [newFolder, setNewFolder] = useState("");

    useEffect(() => {
        
        if(app){
            console.log("app.includesParts Before@", app.includesParts);
            setAllFolders(Object.values(app.foldersToDisplay).map((folder)=>(
                folder
                )));
            setOriginalParts(app.includesParts);
        }
       
    }, []);

    useEffect(() => {
        const allAppPartsHelper = {};
        if (originalParts){
            console.log("wholeApp", originalParts);
            originalParts.forEach((part) => (
                allAppPartsHelper[part.name]= {
                    ...part,
                    clicked : false
                }
                ));
            // originalParts.forEach((part) => {
            //         allAppPartsHelper[part.name]= part
            //         allAppPartsHelper[part.name].clicked = false
            //     });
            console.log("app.includesParts after@ ", app.includesParts);
        }

        setAllAppParts(allAppPartsHelper);
    }, [originalParts]);


    const partIconClicked = (part) => {

        setAllAppParts({
            ...allAppParts, [part.name]: { 
                ...allAppParts[part.name], 
                clicked: !part.clicked}});
    }

    const addNewPartAndClear = () => {
        setNewPartsAdded({
            ...newPartsAdded, 
            [newPartName]: {
                name: newPartName,
                partId: uuidv4(),
                type: newPartType,
                RepoLink: newPartGitHubRepo,
                folderToBeDisplayedIn: Object.keys(newFolder)[0],
              }
        });
        setNewFoldersToBeAddedToAll({...newFoldersToBeAddedToAll, ...newFolder})
        setAddNewFolderButtonRendering(true);
        setNewPartName("");
        setNewPartGitHubRepo("");
        setNewPartType("");
        setFolderName("");
        setNewFolder("");
        setAddNewFolderInputOpen(false);
    }

    const addNewFolderAndClear = () => {
        const newFolderNum = (allFolders.length + Object.values(newFoldersToBeAddedToAll.length));
        const newFolder = {
            [newFolderNum]: {title: folderName}
        };
        setNewFolder(newFolder);
        setAddNewFolderButtonRendering(false);
    }

    const folderClicked = (folder) => {
        setFolderName(Object.values(folder));
        setNewFolder(folder);
        setAddNewFolderInputOpen(true);
        setAddNewFolderButtonRendering(false);
    }

    const editFolderClicked = () => {
        setNewFolder("");
        setAddNewFolderButtonRendering(true);
    }

    const deleteNewPart = (part) => {
        delete newPartsAdded[part.name];
        setNewPartsAdded({...newPartsAdded});
    }
    
    const addhasBeenClicked = async(e) => {
        e.preventDefault()
        const {
            title,
            source
        } = await findConnectionParameters(url);
        console.log("newPartsAdded", newPartsAdded);
        const newFoldersKeys = Array.from(new Set(Object.values(newPartsAdded).map((part) => (
            part.folderToBeDisplayedIn
            ))));
        const filterFoldersToAll = {};
        newFoldersKeys.map((key) => (
            filterFoldersToAll[key] = newFoldersToBeAddedToAll[key]
        ));
            console.log("newFoldersToBeAddedToAll", newFoldersToBeAddedToAll);
            console.log("filterFoldersToAll", filterFoldersToAll);
        const newDoc = {
            title: title,
            url: url,
            source: source,
            lastModified: "someDate",
            folderToBeDisplayedIn: "1",
            concerningParts: appPartsConcernedWithNewDoc,
            isLinkUpToDate: true, //tickbox checked
        }
        console.log("newPartsAdded", newPartsAdded);
        setUpdatedApp({
            ...app, docs: [
                ...app.docs, newDoc
            ], foldersToDisplay: {
                ...app.foldersToDisplay, ...filterFoldersToAll
            }, includesParts: [
                ...app.includesParts, ...Object.values(newPartsAdded)
            ]

        })
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
                       
                        <OptionsWraper>
                            <label htmlFor="">Existing {appName} Parts</label>
                            {Object.values(allAppParts).map((part)=> (
                                <Button onClick={()=> partIconClicked(part) }>
                                    <FolderIcon
                                        part={part.name}
                                        clicked={allAppParts[part.name].clicked}
                                        > 
                                        { part }
                                    </FolderIcon>
                                </Button>
                            ))}
                            {newPartsAdded
                            &&
                            Object.values(newPartsAdded).map((part)=> (
                                <NewlyAddedPartButton 
                                    onClick={()=> deleteNewPart(part) }
                                    onMouseEnter={() => setDeleteWarningShownn(true)}
                                    onMouseLeave={() => setDeleteWarningShownn(false)}
                                    >
                                    <FolderIcon
                                        part={part.name}
                                        clicked={true}
                                        > 
                                        { part }
                                    </FolderIcon>
                                    {deleteWarningShown
                                    &&
                                        <p>Newly added Part: Click to delete</p>
                                    }
                                </NewlyAddedPartButton>
                            ))
                            }
                            <Button onClick={()=>setAppPartInputOpen(!appPartInputOpen)}>
                                <FolderIcon   
                                    addingButton={true}
                                    buttonTitle={appPartInputOpen? `- close` : `+ Add ${appName} Part`}
                                />
                            </Button>
                        </OptionsWraper>
                        { appPartInputOpen
                        &&
                        <>
                            <TitleButtonWrapper>
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

                                <InputContainer>
                                    <label htmlFor=""> New Part's Main GitHub Repo: {newPartGitHubRepo}</label>
                                    <Input 
                                        key={"newPartGitHubRepo"}
                                        type="text" 
                                        name="newPartGitHubRepo"
                                        value={newPartGitHubRepo}
                                        onChange={(e)=> setNewPartGitHubRepo( e.target.value)}
                                    />
                                </InputContainer>
                            {/* this needs to change this to have particular choices */}
                                <InputContainer>
                                    <label htmlFor=""> New Part Type: {newPartType}</label>
                                    <Input 
                                        key={"newPartType"}
                                        type="text" 
                                        name="newPartType"
                                        value={newPartType}
                                        onChange={(e)=> setNewPartType( e.target.value)}
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <p> Folder to display new part in</p>
                                    { !newFolder?
                                        !addnewFolderInputOpen?
                                            allFolders.map((folder)=> (
                                                <div onClick={() => folderClicked(folder)}>
                                                    <FolderIcon 
                                                        folder={ Object.values(folder)[0] } 
                                                        > 
                                                        { folder }
                                                    </FolderIcon>
                                                </div>
                                            ))
                                        :
                                            <>
                                                <InputContainer>
                                                    <label> New Folder Name: {folderName} </label>
                                                    <div onClick={() => (addNewFolderAndClear())}>
                                                        <FolderIcon
                                                            addingButton={true}
                                                            buttonTitle="add"
                                                        />
                                                    </div>
                                                    <Input 
                                                        key={"newFolderInput"}
                                                        type="text" 
                                                        name="newFolder" 
                                                        value={folderName} 
                                                        onChange={(e)=> setFolderName(e.target.value)}
                                                    />
                                                </InputContainer>
                                            </>
                                    :
                                        <div onClick={editFolderClicked}>
                                            <FolderIcon 
                                                addingButton={true}
                                                buttonTitle={`folder name: ${Object.values(newFolder)[0].title} click to edit`}
                                            /> 
                                        </div>
                                    }
                                    {addNewFolderButtonRendering
                                    &&
                                        <Button onClick={()=>setAddNewFolderInputOpen(!addnewFolderInputOpen)}>
                                            <FolderIcon   
                                                addingButton={true}
                                                buttonTitle={ addnewFolderInputOpen?  "- Back to Existing Folders" : "+ Add New Folder"}
                                            />
                                        </Button>
                                    }
                                </InputContainer>
                                <Button onClick={()=>addNewPartAndClear()}>
                                    <FolderIcon   
                                        addingButton={true}
                                        buttonTitle={ "add this part and start with another" }
                                    />
                                </Button>
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

// the prop app for some reason keeps being mutated

// add logic which populates the array with the parts inside the document
// do I need Id inside the parts?

// the name of the new folder button should allway have "click to delete" on a new line
// adding parts logic
    // if click on on of the new apps, delete (but warn)
        // make the warning nicer
    // should all new part fields be withing the same object? useState({name: "someAppName", gitHub: "someAppGitHub"})

// editing parts logic

// add editing folder logic

// creating the final app updated object
    // new doc is adding now
    // add new part
    // add new folder

// the area the divs are clickable is huge, replace with button?

// bugs:
    // addThisPartAndStartAnother button does not go after new part has been added

// repo title from part constructor have only url (and make certain that it must be a github one)
// I am not sure that each part has a particular repo (let's leave name were it is for now)

// add logic, when clicking done, to not add dublicate object to folder it allready exist

