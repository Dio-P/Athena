import { useState, useMemo, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";
import findConnectionParameters from "../helpers/findConnectionParameters";
import GenericButtonIcon from "./GenericButtonIcon";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import InputUnit from "../containers/InputUnit";
import AddingPartBlock from "../containers/AddingPartBlock";
import useParamsHelper from "../hooks/useParamsHelper";
import { findConserningParts } from "../helpers/AddNewConnectionBlockHelper";
import { refreshIcon } from "../helpers/svgIcons";
import PartsOptions from "../containers/PartsOptions";
import useUpdateAppById from "../hooks/queries/useAppByIdUpdate";
import {
  allPartsFolderToBeDisplValueToStr,
  allFoldersIdStringsToNum,
} from "../helpers/appConstructionHelper";

const DisplayBox = styled.div`
  margin: 10px;
  position: relative;
  border: solid black;
  border-radius: 15px;
  background-color: #fffcfa;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  z-index: 1;
  width: 90%;
  height: 100%;
`;

const RefreshButtonContainer = styled.div`
  display: flex;
  float: right;
  margin: 8px;
`;

const UrlInputContainer = styled.div`
  margin: 40px 0 0 0;
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

const AddNewConnectionBlock = ({
  appToDisplay,
  url,
  setUrl,
  newPartsAdded,
  setNewPartsAdded,
  dbPartsWithClickedKey,
  setDbPartsWithClickedKey,
  newPart,
  setNewPart,
  newFolder,
  setNewFolder,
  onClickingRefresh,
  newlyCreatedFolders,
  setNewlyCreatedFolders,
  folderBeenCreated,
  setFolderBeenCreated,
  settingNewPartFolder,
  addNewFolderAndClear,
  preexistingFolders,
  clickedFolder,
  setClickedFolder,
  newFolderIndexKey,
}) => {
  const [updatedApp, setUpdatedApp] = useState("");
  const [addNewConnectionWasClicked, setAddNewConnectionWasClicked] =
    useState(false);

  const [isAllValid, setIsAllValid] = useState(false);
  const [isUrlWarningOn, setIsUrlWarningOn] = useState(false);
  const [isPartNameWarningOn, setIsPartNameWarningOn] = useState(false);
  const [isFolderWarningOn, setIsFolderWarningOn] = useState(false);

  const {
    manageAddingNewPartParam,
    params: { addingNewPart, addingNewFolder, appId },
  } = useParamsHelper();

  const [data, loading, error] = useUpdateAppById(
    appId,
    updatedApp,
    !!addNewConnectionWasClicked
  );

  useEffect(() => {
    !!url &&
      !isUrlWarningOn &&
      !isPartNameWarningOn &&
      !isFolderWarningOn &&
      setIsAllValid(true);
  }, [url, isUrlWarningOn, isPartNameWarningOn, isFolderWarningOn]);

  const APP_NAME = useMemo(
    () => capitaliseFirstLetters(appToDisplay.name),
    [appToDisplay.name]
  );

  const onClickingAddNewConnection = async (e) => {
    if (!isAllValid) {
      // display something to warn the user if we are here
      // don't know what the bellow does
      // browser.alarms.create("there are values that are invalid")
      return;
    }
    e.preventDefault();
    const { name, source } = await findConnectionParameters(url);
    const newFoldersKeys = Array.from(
      new Set(
        Object.values(newPartsAdded).map((part) => part.folderToBeDisplayedIn)
      )
    );
    const filterFoldersToAll = {};
    console.log("newlyCreatedFolders", newlyCreatedFolders);
    newFoldersKeys.forEach(
      (key) =>
        (filterFoldersToAll[key] = newlyCreatedFolders.find(
          (folder) => (folder.id = key)
        ))
    );

    const newDoc = {
      name: name,
      id: uuidv4(),
      url: url,
      source: source,
      lastModified: "someDate",
      concerningParts: findConserningParts(
        dbPartsWithClickedKey,
        newPartsAdded
      ),
      flags: {
        isLinkUpToDate: true, //tickbox checked
      },
    };

    setUpdatedApp({
      ...appToDisplay,
      properties: {
        ...appToDisplay.properties,
        docs: [...appToDisplay.properties.docs, newDoc],
      },
      folders: allFoldersIdStringsToNum([
        ...appToDisplay?.folders,
        ...Object.values(filterFoldersToAll),
      ]),
      parts: allPartsFolderToBeDisplValueToStr([
        ...appToDisplay.parts,
        ...Object.values(newPartsAdded),
      ]),
    });
    setAddNewConnectionWasClicked(true);
  };

  return (
    <DisplayBox>
      <RefreshButtonContainer>
        <GenericButtonIcon
          onClickFunction={onClickingRefresh}
          type="small"
          icon={refreshIcon}
        />
      </RefreshButtonContainer>
      <FormContainer>
        <UrlInputContainer>
          <InputUnit
            inputTitle="URL"
            type="url"
            name="url"
            value={url}
            onChangeFunction={(input) => setUrl(input)}
            required={true}
            isValueInvalid={isUrlWarningOn}
            setIsValueInvalid={setIsUrlWarningOn}
          />
        </UrlInputContainer>
        <div>
          <p>Choose an app part and display folder</p>

          <OptionsWraper>
            <PartsOptions
              dbPartsWithClickedKey={dbPartsWithClickedKey}
              setDbPartsWithClickedKey={setDbPartsWithClickedKey}
              newPartsAdded={newPartsAdded}
              setNewPartsAdded={setNewPartsAdded}
              APP_NAME={APP_NAME}
            />
            <GenericButtonIcon
              onClickFunction={manageAddingNewPartParam}
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
              newFolder={newFolder}
              setNewFolder={setNewFolder}
              addingNewFolder={addingNewFolder}
              preexistingFolders={preexistingFolders}
              allNewFolders={newlyCreatedFolders}
              folderBeenCreated={folderBeenCreated}
              setFolderBeenCreated={setFolderBeenCreated}
              newlyCreatedFolders={newlyCreatedFolders}
              setNewlyCreatedFolders={setNewlyCreatedFolders}
              settingNewPartFolder={settingNewPartFolder}
              addNewFolderAndClear={addNewFolderAndClear}
              clickedFolder={clickedFolder}
              setClickedFolder={setClickedFolder}
              newFolderIndexKey={newFolderIndexKey}
              isUrlWarningOn={isUrlWarningOn}
              setIsUrlWarningOn={setIsUrlWarningOn}
              isPartNameWarningOn={isPartNameWarningOn}
              setIsPartNameWarningOn={setIsPartNameWarningOn}
              isFolderWarningOn={isFolderWarningOn}
              setIsFolderWarningOn={setIsFolderWarningOn}
            />
          )}
        </div>
        <AddConnectionButtonWrapper>
          <GenericButtonIcon
            label="+ Add New Connection"
            onClickFunction={onClickingAddNewConnection}
            type="add"
          />
        </AddConnectionButtonWrapper>
      </FormContainer>
    </DisplayBox>
  );
};

export default AddNewConnectionBlock;

// working:
// display worning if newly added part gets unclicked. Under the part's icon
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
