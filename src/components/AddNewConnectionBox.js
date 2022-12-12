import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "@emotion/styled";
import findConnectionParameters from "../helpers/findConnectionParameters";
import FolderIcon from "./ButtonIcon";
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
    margin-left: 12px;
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
    const [updatedApp, setUpdatedApp] = useState("");
    const [allAppParts, setAllAppParts] = useState([]);
    
    const [url, setUrl] = useState("");
    const [newPart, setNewPart] = useState({
        name: "",
        id: uuidv4(),
        ghRepo: "",
        type: "",
        folderToBeDisplayedIn: "",
    });
    const [newPartsAdded, setNewPartsAdded] = useState("");   
    const [folderName, setFolderName] = useState("");
    const [newFoldersToBeAddedToAll, setNewFoldersToBeAddedToAll] = useState([]);
    const [newPartsFolder, setNewPartsFolder] = useState("");

    const [display, setDisplay] = useState({
        newPartInput: false,
        deleteWarningNewPart: false,
        newFolderInput: false,
        newFolderButton: true,
    });


    const appName = useCapitaliseFirstLetter(app.name);

    ///////////

    useEffect(() => {
        console.log("newPart", newPart);
    }, [newPart]);
    useEffect(() => {
        console.log("updatedApp", updatedApp);
    }, [updatedApp]);

    //////////

    useEffect(() => {
        const allAppPartsHelper = {};
        if (app?.parts){
            app.parts.forEach((part) => (
                allAppPartsHelper[part.name]= {
                    ...part,
                    clicked : false
                }
                ));
            setAllAppParts(allAppPartsHelper);
        }

    }, [app?.parts]);


    const togglePartClicked = (part) => {
        setAllAppParts({
            ...allAppParts, [part.name]: { 
                ...allAppParts[part.name], 
                clicked: !part.clicked}});
    }

    const addNewPartAndClear = () => {
        setNewPartsAdded({
            ...newPartsAdded, 
            [newPart.name]: {
                ...newPart,
                folderToBeDisplayedIn: Object.keys(newPartsFolder)[0],
              }
        });

        setNewFoldersToBeAddedToAll({...newFoldersToBeAddedToAll, ...newPartsFolder});
        setDisplay({
            ...display,
            newFolderButton: true
        })
        setNewPart({
            ...newPart,
            name: "",
            ghRepo: "",
            type: "",
        })
        setFolderName("");
        setNewPartsFolder("");
        setDisplay({
            ...display,
            newFolderInput: false
        })
    }

    const addNewFolderAndClear = () => {
        const newFolderNum = ((Object.values(app.folders).length || 0) + (Object.values(newFoldersToBeAddedToAll).length || 0));
        const newFolder = {
            [newFolderNum]: {title: folderName} //////for some reason the instead of the number I have title in newPartsFolder
        };
        setNewPartsFolder(newFolder);
        setNewPart({
            ...newPart,
            folderToBeDisplayedIn: newFolderNum
        })
        setDisplay({
            ...display,
            newFolderButton: false
        })
    }

    const folderInfoToState = (folder) => {
        console.log("into folder info to state", folder);
        setFolderName(Object.values(folder));
        setNewPartsFolder(folder);////// this needs to be reviewed 
        setNewPart({
            ...newPart,
            folderToBeDisplayedIn: Object.keys(folder),
        })
        // setDisplay({
        //     ...display,
        //     newFolderInput: true
        // })
        setDisplay({
            ...display,
            newFolderButton: false
        })
    }

    const resetFolderInfo = () => {
        setNewPartsFolder("");
        setDisplay({
            ...display,
            newFolderButton: true
        })
    }

    const deleteNewPart = (part) => {
        delete newPartsAdded[part.name];
        setNewPartsAdded({...newPartsAdded});
    }

    const findConserningParts = () => {
        const checkedExistingPartIds = Object.values(allAppParts).filter((part) => 
            part.clicked
            ).map((part) => part.partId);
            console.log("Object.values(newPartsAdded)", Object.values(newPartsAdded));
        const newPartsIds = Object.values(newPartsAdded).map((part) => (part.id));
        return [...checkedExistingPartIds, ...newPartsIds]
    }
    
    const addhasBeenClicked = async(e) => {
        e.preventDefault()
        const {
            title,
            source
        } = await findConnectionParameters(url);
        const newFoldersKeys = Array.from(new Set(Object.values(newPartsAdded).map((part) => (
            part.folderToBeDisplayedIn
            ))));
        const filterFoldersToAll = {};
        newFoldersKeys.map((key) => (
            filterFoldersToAll[key] = newFoldersToBeAddedToAll[key]
        ));

        const newDoc = {
            title: title,
            url: url,
            source: source,
            lastModified: "someDate",
            concerningParts: findConserningParts(),
            flags: {
                isLinkUpToDate: true, //tickbox checked
            }
        }
        setUpdatedApp({
            ...app, docs: [
                ...app.docs, newDoc
            ], folders: {
                ...app.folders, ...filterFoldersToAll
            }, parts: [
                ...app.parts, ...Object.values(newPartsAdded)
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
                                <Button onClick={()=> togglePartClicked(part) }>
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
                                    onMouseEnter={() => setDisplay({ ...display, deleteWarningNewPart:true })}
                                    onMouseLeave={() => setDisplay({ ...display, deleteWarningNewPart:false })}
                                    >
                                    <FolderIcon
                                        part={part.name}
                                        clicked={true}
                                        > 
                                        { part }
                                    </FolderIcon>
                                    {display.deleteWarningNewPart
                                    &&
                                        <p>Newly added Part: Click to delete</p>
                                    }
                                </NewlyAddedPartButton>
                            ))
                            }
                            <Button onClick={()=>setDisplay({...display, newPartInput: !display.newPartInput})}>
                                <FolderIcon   
                                    addingButton={true}
                                    buttonTitle={display.newPartInput? `- close` : `+ Add ${appName} Part`}
                                />
                            </Button>
                        </OptionsWraper>
                        { display.newPartInput
                        &&
                        
                        <DisplayBox>
                            <TitleButtonWrapper>
                                <h3>New Part</h3> 
                            </TitleButtonWrapper>

                            <InputContainer>
                                <label htmlFor=""> New Part Name: {newPart.name}</label>
                                <Input 
                                    key={"newFolderInput"}
                                    type="text" 
                                    name="newFolder"
                                    value={newPart.name}
                                    onChange={(e)=> setNewPart( {...newPart, name: e.target.value} )}
                                />
                            </InputContainer>

                            <InputContainer>
                                <label htmlFor=""> New Part's Main GitHub Repo: { newPart.ghRepo }</label>
                                <Input 
                                    key={"newPartGitHubRepo"}
                                    type="text" 
                                    name="newPartGitHubRepo"
                                    value={newPart.ghRepo}
                                    onChange={(e)=> setNewPart( {...newPart, ghRepo: e.target.value} )}
                                />
                            </InputContainer>
                            
                            <InputContainer>
                                <label htmlFor=""> New Part Type: {newPart.type}</label>
                                <Input 
                                    key={"newPartType"}
                                    type="text" 
                                    name="newPartType"
                                    value={newPart.type}
                                    onChange={(e)=> setNewPart( {...newPart, type: e.target.value} )}
                                />
                            </InputContainer>

                            <InputContainer>
                                <p> Folder to display new part in</p>
                                { !newPartsFolder?
                                    !display.newFolderInput?
                                    Object.values(app.folders).map((folder)=> (
                                            <Button onClick={() => folderInfoToState(folder)}>
                                                <FolderIcon 
                                                    folder={Object.values(folder)[0]} //see if you can take away this obj val too
                                                    /> 
                                            </Button>
                                        ))
                                    :
                                        <>
                                                <label> New Folder Name: {folderName} </label>
                                            <InputContainer>
                                                <Button onClick={() => (addNewFolderAndClear())}>
                                                    <FolderIcon
                                                        addingButton={true}
                                                        buttonTitle="add"
                                                        />
                                                </Button>
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
                                    <Button onClick={resetFolderInfo}>
                                        <FolderIcon 
                                            addingButton={true}
                                            buttonTitle={`folder name: ${Object.values(newPartsFolder)[0].title} click to edit`}
                                        /> 
                                    </Button>
                                }
                                {display.newFolderButton
                                &&
                                    <Button onClick={()=> setDisplay( {...display, newFolderInput: !display.newFolderInput}) }>
                                        
                                        <FolderIcon   
                                            addingButton={true}
                                            buttonTitle={ display.newFolderInput?  "- Back to Existing Folders" : "+ Add New Folder"}
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

// !!!!!after already adding a new folder the button does not reapear.!!!!!
// !!!! there is a bug which returns title instead of the folders number, I think that this has to do with conflict of di
// fferent approaches for the folder structure. I need to find where the bug is comming from and deside if it is going to be an array or object and fix it
// globaly!!!!!

// for the parts and folders find a way to make them display as list in options, or do something that will make it easier if you have many
// instead of them being green make a green stroke and a tick sign, also remove the shadow
// logic witch manages the folder to display inside the documnent
// add safety in the case the user just wants to add a link 
// add safety so adding is not possible if empty fields.
// add safety so the duplication of the parts is not possible.

// devide into seperato components if possible
// see if now that the prop object is not mutated you can remove the state where you where storing it 
// first thing.
// ask:
    // ask if there is any way to have conditional to change values within emotion even while 
    // having them above the function cumponent.
    // ask why the original object was mutated.
    // setting state on change within an object


// the name of the new folder button should allway have "click to delete" on a new line
// adding parts logic
        // make the warning nicer
    // should all new part fields be withing the same object? useState({name: "someAppName", gitHub: "someAppGitHub"})

// add editing parts and folders logic

// the area the divs are clickable is huge, replace with button?

// bugs:

// repo title from part constructor have only url (and make certain that it must be a github one)
// I am not sure that each part has a particular repo (let's leave name were it is for now)

// add logic, when clicking done, to not add dublicate object to folder it allready exist

// Priorities:
    // add new doc logic
    // tidy it up
        // finalise the styling
    // change folder structure into something easier
    // add display part logic
    // add edit part logic
    // add comments logic 
        // and see how easy it is to connect with bbc users and login.
    // start adding testing try tdd from here on
    // add GraphQl and connect with server
    // add links using string Query or something else
    // add docker if you want
    // add aws logic to have it online

    // turn server to typescript
    // expand on busines logic add technologies and initials

