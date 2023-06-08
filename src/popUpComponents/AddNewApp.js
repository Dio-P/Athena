import styled from "@emotion/styled";
import styleVariables from "../styleVariables";
import GenericButtonIcon from "../components/GenericButtonIcon";
import DropDown from "../components/DropDown";

const AddNewAppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddNewApp = ({newApp, setNewApp}) => {
  return (
    <AddNewAppContainer>
      <styleVariables.popupElements.LabelInputPair>
        <label>Name</label>
        <input
          type="text"
          value={newApp.name}
          onChange={(e) => setNewApp({...newApp, name: e.target.value})}
        />
      </styleVariables.popupElements.LabelInputPair>
      {/* make type dropDown and open appTypes collection on mongo */}
      {/* <styleVariables.popupElements.LabelInputPair>
        <label>Type</label>
        <input
          type="text"
          value={}
          onChange={(e) => setNewApp({...newApp, value: e.target.value})}
        />
      </styleVariables.popupElements.LabelInputPair> */}
      <styleVariables.popupElements.LabelInputPair>
        <label>GitHubRepo</label>
        <input
          type="text"
          value={newApp.gitHubRepo}
          onChange={(e) => setNewApp({...newApp, gitHubRepo: e.target.value})}
        />
      </styleVariables.popupElements.LabelInputPair>
      <styleVariables.popupElements.LabelInputPair>
        <label>BriefDescr</label>
        <input
          type="text"
          value={newApp.briefDescr}
          onChange={(e) => setNewApp({...newApp, briefDescr: e.target.value})}
        />
      </styleVariables.popupElements.LabelInputPair>
      <styleVariables.popupElements.LabelInputPair>
        <label>Team(s) Responsible</label>
        <div>
          <GenericButtonIcon
            type={"tag"}
            label={newApp.teams[0]}
            aria={`${newApp.teams[0]}team icon`}
          />
          {(newApp.teams > 1) &&
            newApp.teams.map((team, index) => {
              return (index !==0) && (
                <GenericButtonIcon
                  key={newApp.teams[index]}
                  type="tagWithX"
                  aria={`${newApp.teams[index]} team icon`}
                  // onClickFunction={//removeteam}
                />
              )
            })
            // slice second element onwards teams.slice(1).map
          }
          {/* dropDown with available teams only (all teams - already chosen)
          we need a call that will be getting all teams 
          we need to be able to have empty teams so probably a separate collection 
          start with mocking this*/}
          <DropDown /> 
          {/* freshlyAddedValue */}
        </div>
      </styleVariables.popupElements.LabelInputPair>
      <GenericButtonIcon
        label="Add"
        type="add"
        // onClickFunction={appAppAndClose}
      />
    </AddNewAppContainer>
  )
}

export default AddNewApp;

    // name: "",
    // type: "",
    // gitHubRepo: "",
    // briefDescr: "",
    // teams: [teamName], //add a team button next to it => dropdown => create a team button
    // facing: {
    //   user: false,//radio button
    //   audience: false,//radio button
    // },
    // folders: [],
    // parts: [],
    // // connections: [],
    // properties: {
    //   docs: [] //no adding doc from here for now Only warning that if you want to add you need to create the app first and click on it.
    // }

    // add "no docs available if there are no docs for the particular app"