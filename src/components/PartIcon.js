import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import GenericButtonIcon from "./GenericButtonIcon";
import { moreIcon } from "../helpers/svgIcons";
import AdditionalOptions from "./AdditionalOptions";
import PopUp from "./PopUp";
import EditPart from "../popUpComponents/EditPart";
import usePartByIdUpdate from "../hooks/queries/usePartByIdUpdate";
import useParamsHelper from "../hooks/useParamsHelper";
import usePartByIdDelete from "../hooks/queries/usePartByIdDelete";
import Delete from "../popUpComponents/Delete";

const WholeBoxContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 8px;
  min-width: 150px;
  min-height: 130px;
  max-width: 200px;
  max-height: 200px;
  background-color: #1d4587;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  border-radius: 15px 10%;
`;

const IconButton = styled.div`
  cursor: pointer;
  color: white;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  font-size: 14px;

  h4 {
    margin: 15px;
  }

  p {
    margin: 15px;
  }

  a {
    font-size: smaller;
    margin: auto;
    color: #fcabd1;
    text-decoration: none;
  }
`;
const PartIcon = ({
  part,
  appId,
  //   folders,
  preexistingFolders,
  newlyCreatedFolders,
  updatingPartFolder,
  newFolder,
  addNewFolderAndClear,
  folderBeenCreated,
  setFolderBeenCreated,
  setNewFolder,
  // updateApp,
  // setEditedPart,
  // editPartData,
  // editPartLoading,
  // editPartError,
  // editPartOpen,
  // setEditPartOpen
}) => {
  const {
    manageEditingPartParam,
    params: { editingPart },
  } = useParamsHelper();

  const [moreOptionOpen, setMoreOptionsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const partName = capitaliseFirstLetters(part.name);
  const partType = capitaliseFirstLetters(part.type);
  const ghRepo = part.ghRepo;

  const [editedPart, setEditedPart] = useState({
    name: part.name,
    id: part.id,
    ghRepo: part.ghRepo,
    type: part.type,
    folderToBeDisplayedIn: part.folderToBeDisplayedIn,
    // appParent:,
    // do I need to add the docs?
  });
  const [editPartWasClicked, setEditPartWasClicked] = useState(false);
  const { editPartMutation } = usePartByIdUpdate(
    part.id,
    editedPart,
    editPartWasClicked
  );

  const [deletePartWasClicked, setDeletePartWasClicked] = useState(false);

  const {} = usePartByIdDelete(part.id, deletePartWasClicked);

  const editPartAndClose = () => {
    setEditPartWasClicked(true);
    manageEditingPartParam();
  };

  const deletePartAndClose = () => {
    setDeletePartWasClicked(true);
    setIsPopupOpen(false)  
  };

  return (
    <WholeBoxContainer>
      <IconButton>
        <Link
          to={`/${appId}/${part.id}`}
          // state={part.id}
        >
          <IconButton>
            <h4>{partName}</h4>
            <div href={ghRepo}> ({ghRepo}) </div>
            <p> type : {partType}</p>
          </IconButton>
        </Link>
        <GenericButtonIcon
          type="small"
          icon={moreIcon}
          onClickFunction={() => setMoreOptionsOpen(!moreOptionOpen)}
        />
        {moreOptionOpen && (
          <AdditionalOptions
            options={[
              {
                title: "edit",
                onClickFunction: manageEditingPartParam,
              },
              {
                title: "delete",
                onClickFunction: ()=>setIsPopupOpen(!isPopupOpen),
              },
            ]}
          />
        )}
        <PopUp
          isPopUpOpen={editingPart}
          setIsPopUpOpen={manageEditingPartParam}
          ComponentToDisplay={EditPart}
          part={part}
          //   folders={folders}
          preexistingFolders={preexistingFolders}
          newlyCreatedFolders={newlyCreatedFolders}
          secondaryFunction={updatingPartFolder}
          // tertiaryFunction={updateApp}
          newFolder={newFolder}
          onClickFunction={addNewFolderAndClear}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
          setNewFolder={setNewFolder}
          editedPart={editedPart}
          setEditedPart={setEditedPart}
          editPartMutation={editPartMutation}
          // editPartData={editPartData}
          // editPartLoading={editPartLoading}
          // editPartError={editPartError}
          editPartAndClose={editPartAndClose}
        />
        <PopUp
          ComponentToDisplay={Delete}
          isPopUpOpen={isPopupOpen}
          setIsPopUpOpen={()=>setIsPopupOpen(!isPopupOpen)}
          data={capitaliseFirstLetters(part.name)}
          deleteEntityFunction={deletePartAndClose}
        />
      </IconButton>
    </WholeBoxContainer>
  );
};

export default PartIcon;
