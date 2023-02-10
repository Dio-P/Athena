import { useState, useMemo, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";
import findConnectionParameters from "../helpers/findConnectionParameters";
import ButtonUnit from "../containers/ButtonUnit";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import useAppByIdSearch from "../hooks/queries/useAppByIdSearch";
import InputUnit from "../containers/InputUnit";
import AddingPartBlock from "../containers/AddingPartBlock";
import PopulateButtonUnits from "../containers/PopulateButtonUnits";
import useAppPartsHelper from "../hooks/useAppPartsHelper";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";
import {
  findConserningParts,
  allUniqueFolderKeys,
} from "../helpers/addNewDocHelper";

const DisplayBox = styled.div`
  margin: 10px;
  position: relative;
  height: 100%;
  border: solid black;
  border-radius: 15px;
  background-color: #fffcfa;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  z-index: 1;
  width: 90%;
  height: 100%;
`;

const FormContainer = styled.div`
  margin: 6px;
`;

const OptionsWraper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddConnectionButtonWrapper = styled.div`
  display: flex;
  align-text: center;
`;

const AddNewConnectionBox = ({
  appToDisplay,
  url,
  setUrl,
  preexistingParts,
  newPartsAdded,
  setNewPartsAdded,
  allAppParts,
  setAllAppParts,
  newPart,
  setNewPart,
  folderOfNewPart,
  setFolderOfNewPart,
  onClickingRefresh,
}) => {
  console.log("AddNewConnectionBox");
  const didMountRef = useRef(false);

  const [updatedApp, setUpdatedApp] = useState("");

  const {
    clickingToAddNewPart,
    clickingToAddNewFolder,
    keepExistingParams,
    params: { addingNewPart, addingNewFolder },
  } = useParamsHelper();

  const [display, setDisplay] = useState({
    deleteWarningNewPart: false,
  });

  const foldersToDisplay = appToDisplay && didMountRef && appToDisplay.folders;
  const { newlyCreatedFolders, setNewlyCreatedFolders, clickedFolder } =
    useFolderHelper(foldersToDisplay);

  const APP_NAME = useMemo(
    () => capitaliseFirstLetters(appToDisplay.name),
    [appToDisplay.name]
  );

  const appPartsArray = useMemo(
    () => allAppParts && Object.values(allAppParts),
    [allAppParts]
  );

  const newPartsAddedArray = useMemo(
    () => newPartsAdded && Object.values(newPartsAdded),
    [newPartsAdded]
  );

  const onClickingPart = (part) => {
    if (part) {
      setAllAppParts({
        ...allAppParts,
        [part.name]: {
          ...allAppParts[part.name],
          clicked: !part.clicked,
        },
      });
    }
    keepExistingParams();
  };

  const onClickingAdd = async (e) => {
    e.preventDefault();
    const { name, source } = await findConnectionParameters(url);
    const newFoldersKeys = Array.from(
      new Set(
        Object.values(newPartsAdded).map((part) => part.folderToBeDisplayedIn)
      )
    );
    const filterFoldersToAll = {};
    newFoldersKeys.map(
      (key) => (filterFoldersToAll[key] = newlyCreatedFolders[key])
    );
    const newDoc = {
      name: name,
      id: uuidv4(),
      url: url,
      source: source,
      lastModified: "someDate",
      concerningParts: findConserningParts(allAppParts, newPartsAdded),
      flags: {
        isLinkUpToDate: true, //tickbox checked
      },
    };
    setUpdatedApp({
      ...appToDisplay,
      docs: [...appToDisplay.docs, newDoc],
      folders: [...appToDisplay.folders, ...filterFoldersToAll],
      parts: [...appToDisplay.parts, ...Object.values(newPartsAdded)],
    });
  };

  const deleteNewlyAddedPart = (part) => {
    const folderIdIsInUse = (id) =>
      allUniqueFolderKeys(preexistingParts, newPartsAdded).includes(id);
    delete newPartsAdded[part.name];
    setNewPartsAdded({ ...newPartsAdded });
    // delete the folders key if no app is using it
    const updatedNewFoldersFolder = newlyCreatedFolders.filter(({ id }) =>
      folderIdIsInUse(id)
    );

    setNewlyCreatedFolders(updatedNewFoldersFolder);
    keepExistingParams();
  };

  return (
    <DisplayBox>
      <ButtonUnit label={"refresh"} onClickFunction={onClickingRefresh} />

      <FormContainer>
        <InputUnit
          inputTitle="URL"
          type="text"
          name="url"
          value={url}
          onChangeFunction={(input) => setUrl(input)}
        />
        <div>
          <p>Choose an app part and display folder</p>

          <OptionsWraper>
            <label htmlFor="">Existing {APP_NAME} Parts</label>
            <PopulateButtonUnits
              data={appPartsArray}
              onClickFunction={(part) => onClickingPart(part)}
            />
            {newPartsAdded && (
              <PopulateButtonUnits
                data={newPartsAddedArray}
                onClickFunction={(part) => deleteNewlyAddedPart(part)}
                onMouseEnterFunction={() =>
                  setDisplay({ ...display, deleteWarningNewPart: true })
                }
                onMouseLeaveFunction={() =>
                  setDisplay({ ...display, deleteWarningNewPart: false })
                }
                clicked={true}
                conditionalDisplay={
                  display.deleteWarningNewPart && (
                    <p>Newly added Part: Click to delete</p>
                  )
                }
              />
            )}
            <ButtonUnit
              onClickFunction={clickingToAddNewPart}
              type="add"
              label={addingNewPart ? `- close` : `+ Add ${APP_NAME} Part`}
            />
          </OptionsWraper>
          {addingNewPart && (
            <AddingPartBlock
              newPartsAdded={newPartsAdded}
              setNewPartsAdded={setNewPartsAdded}
              newPart={newPart}
              setNewPart={setNewPart}
              folderOfNewPart={folderOfNewPart}
              setFolderOfNewPart={setFolderOfNewPart}
              addingNewFolder={addingNewFolder}
              allPreexistingFolders={appToDisplay.folders}
              allNewFolders={newlyCreatedFolders}
              clickedFolder={clickedFolder}
              clickingToAddNewFolder={clickingToAddNewFolder}
            />
          )}
        </div>
        {/* {
                        (url && clickedFolder && part)
                        ? */}
        <AddConnectionButtonWrapper>
          <ButtonUnit
            label="+ Add New Connection"
            onClickFunction={onClickingAdd}
            type="add"
          />
        </AddConnectionButtonWrapper>
        {/* <button type="submit" onClick={onClickingAdd}>
          Add
        </button> */}
        {/* :
                            <button onClick>Add</button>
                        } */}

        {/* {url
                        &&
                            <UrlInputBox onClick={onClickingAdd}>
                                {`add: ${url}`}
                            </UrlInputBox>
                        } */}
      </FormContainer>
    </DisplayBox>
  );
};

export default AddNewConnectionBox;

// working:
// style of button to have padding
// for the parts and folders find a way to make them display as list in options, or do something that will make it easier if you have many
// instead of them being green make a green stroke and a tick sign, also remove the shadow
// add safety in the case the user just wants to add a link
// add safety so adding is not possible if empty fields.
// add safety so the duplication of the parts is not possible.

// to work:
// the state to display new parts delete worning makes it display for all new parts. Needs to be only for the one.
// What will happen if someone pressis add part without adding new folder?!
// I could also move the upating of the final object in a function to call this instead of updating the state
// in two different places

// logic witch manages the folder to display inside the documnent

// the name of the new folder button should allway have "click to delete" on a new line
// adding parts logic
// make the warning nicer
// should all new part fields be withing the same object? useState({name: "someAPP_NAME", gitHub: "someAppGitHub"})

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
