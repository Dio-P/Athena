import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import styled from "@emotion/styled";
import findConnectionParameters from "../helpers/findConnectionParameters";
import FolderIcon from "./ButtonIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";


const DisplayBox = styled.div`
    margin: 10px;
    position: absolute;
    border: solid black;
    border-radius: 15px;
    background-color: #Fffcfa;
    box-shadow: #2b2a28 0.5em 0.5em 0.3em;
    z-index: 1;
    width: 90%;
    height: 30em;
    max-height:100%;
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

const NewFolderInputContainer = styled.div`
    height: 100%;
    background-color: #Fffcfa;
`;

const AddNewConnectionBox = ({ app, params }) => {
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
    const [newPartsFolder, setNewPartsFolder] = useState("");

    const [newPartsAdded, setNewPartsAdded] = useState("");   //rename this or the one below
    const [folderName, setFolderName] = useState("");
    const [newFoldersToBeAddedToAll, setNewFoldersToBeAddedToAll] = useState([]);
    
    let [searchParams, setSearchParams] = useSearchParams();
    // let [searchParams, setSearchParams] = useSearchParams(({
    //     addNewPart: false,
    //     addNewFolder: false,
    // }));
    const [urlValues, setUrlValues] = useState("");

    const [display, setDisplay] = useState({
        newPartInput: false,////
        deleteWarningNewPart: false,
        newFolderInput: false,////
        newFolderButton: true,
    });

    const existingAppsUniqueFolderKeys = useMemo(() => (Array.from(new Set(Object.values(app.parts).map((part) => (
        part.folderToBeDisplayedIn
        ))))), [app.parts]);

    const newAppsUniqueFoldersKeys = useMemo(() => (Array.from(new Set(Object.values(newPartsAdded).map((part) => (
        part.folderToBeDisplayedIn + ""
        ))))), [newPartsAdded]);

    const allUniqueFolderKeys = useMemo(()=>(
        [...newAppsUniqueFoldersKeys , ...existingAppsUniqueFolderKeys]
    ), [newAppsUniqueFoldersKeys, existingAppsUniqueFolderKeys]);

    const appName = useCapitaliseFirstLetter(app.name);

    useEffect(() => {
        console.log("urlValues", urlValues);
    }, [urlValues])
    

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

    useEffect(() => {
        console.log("display.newPartInput is@@", display.newPartInput);
         
    }, [display.newPartInput])


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
                folderToBeDisplayedIn: newPartsFolder.id || Object.values(newPartsFolder)[0].id,
                // I need to create a singly function that is going to turn this and return a single item in both cases
              }
        });
        console.log("@@newFoldersToBeAddedToAll", newFoldersToBeAddedToAll);
        setNewFoldersToBeAddedToAll([...newFoldersToBeAddedToAll, newPartsFolder]);//////////////////////////////////
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
            newFolderButton: true,
            newFolderInput: false
        })
        console.log("@@newFoldersToBeAddedToAll", newFoldersToBeAddedToAll);

    }

    const addNewFolderAndClear = () => {
        const existingFoldersLength = app.folders.length -1 || 0;
        const newFoldersLength = newFoldersToBeAddedToAll.length +1 || 1;
        const newFolderNum = existingFoldersLength + newFoldersLength;
        const newFolder = {
                title: folderName,
                id: newFolderNum,
            }
        ;
        setNewPartsFolder(newFolder);
        setNewPart({
            ...newPart,
            folderToBeDisplayedIn: newFolderNum,
        })
        setDisplay({
            ...display,
            newFolderButton: false
        })
    }

    const folderInfoToState = (folder) => {
        setFolderName(folder.name);
        // setFolderName(Object.values(folder));
        setNewPartsFolder(folder);
        setNewPart({
            ...newPart,
            folderToBeDisplayedIn: folder.id,
        })
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
        console.log("newFoldersToBeAddedToAll@@", newFoldersToBeAddedToAll);
        console.log("allUniqueFolderKeys@@", allUniqueFolderKeys);
        const folderIdIsInUse = (id) => (allUniqueFolderKeys.includes(id));
        delete newPartsAdded[part.name];
        setNewPartsAdded({...newPartsAdded});
        // delete the folders key if no app is using it
        const updatedNewFoldersFolder = newFoldersToBeAddedToAll.filter(({ id })=>(
            folderIdIsInUse(id)
        ));
        console.log("updatedNewFoldersFolder@fter@", updatedNewFoldersFolder);
        console.log("newFoldersToBeAddedToAll@fter@", newFoldersToBeAddedToAll);
        setNewFoldersToBeAddedToAll(updatedNewFoldersFolder);

    }

    const findConserningParts = () => {
        const checkedExistingPartIds = Object.values(allAppParts).filter((part) => 
            part.clicked
            ).map((part) => part.id);
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
            id: uuidv4(),
            url: url,
            source: source,
            lastModified: "someDate",
            concerningParts: findConserningParts(),
            flags: {
                isLinkUpToDate: true, //tickbox checked
            }
        }
        console.log("...Object.values(newPartsAdded)", newPartsAdded);
        setUpdatedApp({
            ...app, docs: [
                ...app.docs, newDoc
            ], folders: [
                ...app.folders, ...filterFoldersToAll
            ], parts: [
                ...app.parts, ...Object.values(newPartsAdded)
            ]

        })
    };

    const clickingToAddNewPart = () => {
        setDisplay({...display, newPartInput: !display.newPartInput});
        
        const {
            team,
            appId,
            addingNewConnection,
            addingNewPart
          } = params
          if(!display.newPartInput){
            setSearchParams({...params, addingNewPart: true});
          }else{
            setSearchParams({team, appId, addingNewConnection}) 
          }
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
                            <Button onClick={()=> clickingToAddNewPart()}>
                                <FolderIcon   
                                    addingButton={true}
                                    buttonTitle={display.newPartInput? `- close` : `+ Add ${appName} Part`}/////
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
                                    <>
                                    {app.folders.map((folder)=> (
                                            <Button onClick={() => folderInfoToState(folder)}>
                                                <FolderIcon 
                                                    folder={folder.title} //see if you can take away this obj val too
                                                    /> 
                                            </Button>
                                        ))}
                                    {newFoldersToBeAddedToAll.map((folder) => (
                                        <Button onClick={() => folderInfoToState(folder)}>
                                            <FolderIcon 
                                                folder={folder.title} //see if you can take away this obj val too
                                                /> 
                                        </Button>
                                    ))}
                                    </>
                                    :
                                        <NewFolderInputContainer>
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
                                        </NewFolderInputContainer>
                                :
                                    <Button onClick={resetFolderInfo}>
                                        <FolderIcon 
                                            addingButton={true}
                                            buttonTitle={`folder name: ${newPartsFolder.title} click to edit`}
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

// working:
// line 240 shows a new part with empty string
// start putting things into specific functions and use TDD
// can I move the set new part logic to folder to be displayed in within the new app? And feed it with a functions result?

// to work:
// the state to display new parts delete worning makes it display for all new parts. Needs to be only for the one. 
// What will happen if someone pressis add part without adding new folder?!
// I could also move the upating of the final object in a function to call this instead of updating the state
// in two different places 

// for the parts and folders find a way to make them display as list in options, or do something that will make it easier if you have many
// instead of them being green make a green stroke and a tick sign, also remove the shadow
// logic witch manages the folder to display inside the documnent
// add safety in the case the user just wants to add a link 
// add safety so adding is not possible if empty fields.
// add safety so the duplication of the parts is not possible.

// devide into seperato components if possible

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

